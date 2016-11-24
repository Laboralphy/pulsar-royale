var Materializer = (function($) {

    var materialCache = {};

    /**
     * Méthode d'initialisation des informations de controller
     * @param controllerName : informations du controller pour l'appel du cache
     */
    function _initController(controllerName) {
        controllerName._controller = controllerName._controller || 'index';
        controllerName._action = controllerName._action || 'index';
        if (!materialCache[controllerName._controller]) {
            materialCache[controllerName._controller] = {
                "index" : {}
            };
        }
        if (!materialCache[controllerName._controller][controllerName._action]) {
            materialCache[controllerName._controller][controllerName._action] = {};
        }
        return controllerName;
    }

    /**
     * Méthode publique de déclaration d'un controller
     * @param controllerName : informations du controller pour l'appel du cache
     * @param script : prototype ref : $.widget()
     */
    function addController(controllerName, script) {
        controllerName = _initController(controllerName);
        if (materialCache[controllerName._controller][controllerName._action]) {
            var ctrlName = controllerName._controller + '-' + controllerName._action;
            var nameSpace = 'materializer.' + ctrlName;
            materialCache[controllerName._controller][controllerName._action].script = $.widget(nameSpace, script);
        } else {
            console.error("Impossible d'ajouter le script " + controllerName._controller + "/" + controllerName._action + "... Aucun template associé");
        }
    }
    var loadedController = {};

    /**
     * Méthode publique d'appel d'un controller sur un élément
     * @param controllerName : informations du controller pour l'appel du cache
     * @param options : informations liées au chargement du controller
     */
    $.fn.getController = function(controllerName, options) {
        var element = this;
        controllerName = _initController(controllerName);
        options = $.extend(options || {}, {
            dataType : "script",
            cache : true,
            url : '../bundles/'+ bundleName +'/js/controller/' + controllerName._controller + '/' + controllerName._action + '.js'
        });
        if (!loadedController[controllerName._controller]) {
            loadedController[controllerName._controller] = {};
        }
        _garbageCollector(controllerName._controller);
        controllerName._param = {
            _param : controllerName._param
        };
        if (materialCache[controllerName._controller][controllerName._action].script) {
            loadedController[controllerName._controller][controllerName._action] = new materialCache[controllerName._controller][controllerName._action].script(controllerName._param, element);
            return materialCache[controllerName._controller][controllerName._action].jqXHR;
        } else {
            return $.ajax(options).done(function(data, textStatus, jqXHR) {
                if (!materialCache[controllerName._controller][controllerName._action].script) {
                    console.error('Le script ' + options.url + ' n\'a pas ajouté au controllers. Utiliser Materializer.addController() est recommandé')
                } else {
                    loadedController[controllerName._controller][controllerName._action] = new materialCache[controllerName._controller][controllerName._action].script(controllerName._param, element);
                }
            });
        }
    };

    /**
     * Méthode de nettoyage au changement de controller
     */
    var _garbageCollector = function(_controller) {
        $.each(loadedController, function(ctrlName, actions) {
            if (ctrlName != _controller) {
                $.each(actions, function(actionName, action) {
                    action.destroy();
                });
                ctrlName = {};
            }
        });
    }

    /**
     * Méthode de chargement de template
     * @param controllerName : informations du controller pour l'appel du cache
     * @param options : informations liées au chargement du template
     */
    var cachedTemplate = function(controllerName, options) {
        controllerName = _initController(controllerName);
        if (materialCache[controllerName._controller][controllerName._action].jqXHR && options.method == 'GET') {
            return materialCache[controllerName._controller][controllerName._action].jqXHR;
        } else {
            var ajax = $.ajax(options);
            if (options.method == 'GET') {
                ajax.done(function(data, textStatus, jqXHR) {
                    materialCache[controllerName._controller][controllerName._action].jqXHR = jqXHR;
                });
            }
            return ajax;
        }
    };

    /**
     * Méthode publique d'utilisation du chargeur de template
     * @param url : adresse de chargement du template
     * @param target : l'élément qui sera la cible du chargement (par défaut #block)
     * @param form : pour le formulaire, le formulaire à parser pour poster
     */
    function methodAjax(url, target, form) {
        var href = (url).replace(/#/g, '');
        var hrefSplit = href.split('/');
        var controller = {
            "_controller" : hrefSplit[0],
            "_action" : hrefSplit[1]
        };
        var cible = target || (target === null ? null : '#block');
        hrefSplit.splice(0, 2);
        $.each(hrefSplit, function(index, value) {
            var param = {};
            param[hrefSplit[index]] = hrefSplit[index + 1];
            $.extend(true, controller, {
                "_param" : param
            });
            hrefSplit.splice(0, 1);
        });
        var result = false;
        if (cible != 'window') {
            var dataString = null;
            var methode = 'GET';
            if (form) {
                dataString = $(form).serializeArray();
                methode = 'POST';
            }
            if (url) {
                $('#AjaxInProgress').show();
                result = cachedTemplate(controller, {
                    url : href,
                    data : dataString,
                    method : methode,
                }).success(function(data, xhr, textStatus) {
                    $(cible).html(data);
                    $(cible).getController(controller).complete(function() {
                        $(cible).materializeLayout();
                    }).error(ajaxError);
                }).error(ajaxError).complete(function() {
                    $('#AjaxInProgress').hide('slow');
                });
            }
            return result;
        }
    }

    function methodJson(options) {
        if (options.url) {
            options = $.extend(options || {}, {
                dataType : "json"
            });
            $('#AjaxInProgress').show();
            return $.ajax(options).error(ajaxError).complete(function() {
                $('#AjaxInProgress').hide('slow');
            });
        } else {
            console.error('Une URL est requise');
        }
    }

    function ajaxError(xhr, textStatus, errorThrown) {
        function parseException(exception) {
            var html = $.map(exception, function(value, index) {
                if ($.isPlainObject(value) || $.isArray(value)) {
                    return parseException(value) +'<br/>';
                } else {
                    return index +' : '+ value +'<br/>';
                }
            });
            return html;
        }
        var data = xhr.responseText;
        var $msg = $('<div>').append("<strong>Code status :</strong>").append("<span> " + xhr.status + "</span>").append("<br/>").append("<strong>Réponse :</strong>").append("<span> " + xhr.statusText + "</span>").append("<br/>");
        if (data.match(/<(.+)>/)) { // détection du HTML
            var $dom = $(data);
            var $symfonyException = $('.sf-reset', $dom);
            var $css = $($dom).find('link');
            if ($symfonyException[0]) {
                var symfonyException = $('<div>').append($css).append($symfonyException).html();
            } else {
                var symfonyException = $.parseHTML(data)
            }
            $msg.append("<strong>Réponse de symfony :</strong><br/>").append(symfonyException);
        } else {
            var json = $.parseJSON(data);
            if (typeof json =='object') {
                $msg.append("<br/><strong>Réponse du serveur (JSON) :</strong><br/><p>" + parseException(json.error.exception) + '</p>');
            } else {
                $msg.append("<br/><strong>Réponse du serveur :</strong><br/><p>" + data + '</p>');
            }
        }
        navModal('Erreur au chargement de la page', $msg);
    }

    function navModal(title, message) {
        var $modal = $('#modalNav');
        var $modalContent = $('.modal-content', $modal);
        $('h4', $modalContent).html(title);
        $('p', $modalContent).html('').append(message);
        $('.modal-footer a', $modal).on('click', function(e) {
            e.preventDefault();
        });
        $modal.modal('open');
    }
    var curModal = 0;
    function createModal(options) {
        var optionsDefault = {
            "title" : null,
            "content" : "Aucun contenu",
            "type" : '',
            "ready" : function() {},
            "complete" : function() {
                $modal.remove();
            },
            "footer" : {
                "Ok" : {
                    "classe" : "modal-close"
                }
            }
        };
        var settings = $.extend(optionsDefault, options);
        curModal++;
        var $modal = $('<div id="modal' + curModal + '" class="modal ' + settings.type + '"></div>');
        var $modalContent = $('<div class="modal-content">');
        var $modalContentHeader = $('<h4>').append(settings.header);
        var $modalContentContent = $('<p>').append(settings.content);
        var $modalFooter = $('<div class="modal-footer">');
        $.each(settings.footer, function(key, button) {
            var $button = $('<a href="#!" class=" modal-action waves-effect waves-green btn-flat ' + button.classe + '">' + key + '</a>');
            $button.on('click', function(e) {
                e.preventDefault();
            });
            if (button.callback) {
                button.callback($modal, $button);
            }
            $modalFooter.prepend($button);
        });
        $modalContent.append($modalContentHeader, $modalContentContent);
        $modal.append($modalContent, $modalFooter);
        $('body').append($modal);
        $modal.modal(settings).modal('open');
        $modal.materializeLayout();
        return $modal;
    }
    $(function() {
        var appName = document.title;
//        $(window).on('hashchange', function(e) {
//            methodAjax(this.location.hash);
//            document.title = appName + ' - ' + this.location.hash;
//            e.preventDefault();
//        });
//        $(document).on('submit', 'form', function(e) {
//            action = $(this).attr('action') || window.location.hash;
//            var prevent = methodAjax(action, this.target, this);
//            e.preventDefault();
//        });
//        if (this.location.hash) {
//            methodAjax(this.location.hash);
//        }
    });

    /**
     * Méthode de convertion automatique du HTML au materialize
     * 
     * @return : this
     */
    $.fn.materializeLayout = function() {
        $(this).each(function() {
            var $this = $(this);
            // transformation des select
            $this.find('select').material_select();
            $this.find("button[type='submit']").each(function() {
                if (!$(this).hasClass('btn')) {
                    $(this).append('<i class="material-icons right">send</i>');
                }
            });
            $this.find("button").each(function() {
                if (!$(this).hasClass('btn')) {
                    $(this).addClass('btn waves-effect waves-light');
                }
            });
            $this.find('ul.tabs').tabs();
        });
        return this;
    };

    /**
     * Méthode de gestion des hamburger
     * 
     * @return : this
     */

    (function ($) {
        var methods = {
            "init" : function() {
                var $this = this;
                if ($this.materialHamburger('isArrow')) {
                    $this.materialHamburger('fromArrow');
                } else {
                    $this.materialHamburger('toArrow');
                }
            },
            "toArrow" : function() {
                var $this = this;
                if (!$this.materialHamburger('isArrow')) {
                    $this.children().removeClass('material-design-hamburger__icon--from-arrow').addClass('material-design-hamburger__icon--to-arrow');
                }
            },
            "fromArrow" : function() {
                var $this = this;
                if ($this.materialHamburger('isArrow')) {
                    $this.children().removeClass('material-design-hamburger__icon--to-arrow').addClass('material-design-hamburger__icon--from-arrow');
                }
            },
            "isArrow" : function() {
                var $this = this;
                return $this.children().hasClass('material-design-hamburger__icon--to-arrow');
            }
        };
         $.fn.materialHamburger = function(methodOrOptions) {
            if ( methods[methodOrOptions] ) {
                return methods[ methodOrOptions ].apply( this, Array.prototype.slice.call( arguments, 1 ));
            } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
                // Default to "init"
                return methods.init.apply( this, arguments );
            } else {
                $.error( 'Method ' +  methodOrOptions + ' does not exist on jQuery.materialHamburger' );
            }
            return this;
         }; // Plugin end
    }( jQuery ));

    return {
        methodAjax : methodAjax,
        methodJson : methodJson,
        createModal : createModal,
        addController : addController
    };
})(jQuery);