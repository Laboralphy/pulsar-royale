/**
 * Created by florian.saleur on 18/11/16.
 */
O2.createObject("psr.config.cards", {
    /**
     Template de base :
     unite : { // nom technique de l'unité
        // caract d'affichage
        lbl : 'Unité',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'url',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 100, // PV de l'unité
        dmg : 0, // Attaque de l'unité
        asp : 0, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        tgt : 0, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
        nbr : 1, // Nombre d'unité
        xpr : 30, // Durée de vie
     }
     */
    marine : {
        // caract d'affichage
        lbl : 'Marine',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/marine.png',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 3, // cout de la carte
        dsc : "Le scaphandre de cette unité résiste à toutes les balles... Dommage qu'il y ait autant de laser dans ce jeu...", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 125, // PV de l'unité
        dmg : 40, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        tgt : 3, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        spd : 5, // Vitesse de déplacement de l'unité
    },
    ninja : {
        // caract d'affichage
        lbl : 'Ninja',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/ninja.png',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 4, // cout de la carte
        dsc : "La cape en peau de flute retournée qu'utilise cette unité lui offre un avantage tactique important : L'invisibilité ! Du moins tant qu'un ennemie n'est pas trop près pour découvrir la supercherie...", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 600, // PV de l'unité
        dmg : 325, // Attaque de l'unité
        asp : 1.8, // Vitesse d'attaque
        rng : 1, // Portée de l'unité
        tgt : 1, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        spd : 7, // Vitesse de déplacement de l'unité
    },
    porte_fens : {
        // caract d'affichage
        lbl : 'Porte Fens',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/porte_fens.png',    // Url de l'image de la carte
        rrt : 'epique', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : "La porte Fen dispose d'un générateur de Fen dernier cri ! Son moteur en flutonium 215 lui permet une production permanente... Jusqu'à destruction !", // Description de la carte

        // caract Physiques
        lyr : 1, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 2, // Profondeur de l'unité (en lyr)
        hgt : 4, // Hauteur de l'unité (en case)
        wgt : 2, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 500, // PV de l'unité
        dmg : 50, // Attaque de l'unité
        asp : 1, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        tgt : 3, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        spd : 3, // Vitesse de déplacement de l'unité
    },
    fen : {
        // caract d'affichage
        lbl : 'Fen',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/fen.png',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 3, // cout de la carte
        dsc : "Les cockpit de Fen ne sont pas équipés de parachute. Les pilotes décollent en toute connaissance de cause, après avoir été lobotomisé par l'industriel qui produit ce modèle à usage unique...", // Description de la carte

        // caract Physiques
        lyr : 1, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 90, // PV de l'unité
        dmg : 40, // Attaque de l'unité
        asp : 1, // Vitesse d'attaque
        rng : 4, // Portée de l'unité
        tgt : 3, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        spd : 5, // Vitesse de déplacement de l'unité
    },
    foreuse : {
        // caract d'affichage
        lbl : 'Foreuse',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/foreuse.png',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : "La pointe de ce bijoux de technologie est enrichie en flutonium 215, lui conferant une résistance incomparable ! Et en plus c'est tuning !", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 2, // Profondeur de l'unité (en lyr)
        hgt : 3, // Hauteur de l'unité (en case)
        wgt : 2, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 1900, // PV de l'unité
        dmg : 120, // Attaque de l'unité
        asp : 1.5, // Vitesse d'attaque
        rng : 1, // Portée de l'unité
        tgt : 0, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        spd : 2, // Vitesse de déplacement de l'unité
    },
    sniper : {
        // caract d'affichage
        lbl : 'Sniper',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/sniper.png',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 4, // cout de la carte
        dsc : "Ce tireur des litres déteste le contact. Il préfère boire dans son coin.", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 340, // PV de l'unité
        dmg : 100, // Attaque de l'unité
        asp : 1.1, // Vitesse d'attaque
        rng : 6.5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        tgt : 3, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        spd : 5, // Vitesse de déplacement de l'unité
    },
    photocanon : {
        // caract d'affichage
        lbl : 'Photo-canon',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/photocanon.png',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : "Tire de grandes gerbes de flutonium 215 enrichi. L'explosion à l'impact engendre souvent de graves séquelles...", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 450, // PV de l'unité
        dmg : 64, // Attaque de l'unité
        asp : 0.5, // Vitesse d'attaque
        rng : 6, // Portée de l'unité
        aoe : 2, // splash dmg ?
        tgt : 3, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        xpr : 40, // Durée de vie
    },
    canon_laser : {
        // caract d'affichage
        lbl : 'Canon laser',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/canon_laser.png',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 3, // cout de la carte
        dsc : "Le laser de ce canon est formé à partir d'un prisme à ultra-violet flutonisé. Garantie 30 secondes.", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        dmg : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        xpr : 30, // Durée de vie
    },
    missile : {
        // caract d'affichage
        lbl : 'Missile',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Boum ! Une bonne vieille ogive sovietique. Un peu old school mais toujours aussi efficace.', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 3, // Hauteur de l'unité (en case)
        wgt : 3, // Largeur de l'unité (en case)

        // caract de combat
        dmg : 700, // Attaque de l'unité
        tgt : 3, // Ciblage disponible (0: batiments, 1: terrestre, 2: aérien, 3: terrestre & aérien)
        aoe : 2, // splash dmg ?
        spd : 5, // Vitesse de déplacement de l'unité
    },
    iem : {
        // caract d'affichage
        lbl : 'I.E.M',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/iem.png',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 2, // cout de la carte
        dsc : "Chargée au 25.000 V trifluté. Ça sonne !", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 4, // Profondeur de l'unité (en lyr)
        hgt : 5, // Hauteur de l'unité (en case)
        wgt : 5, // Largeur de l'unité (en case)

        // caract de combat
        dmg : 80, // Attaque de l'unité
        aoe : 3 // splash dmg ?
    },
    gravity_bomb : {
        // caract d'affichage
        lbl : 'Bombe gravitationnelle',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'img/gravity_bomb.png',    // Url de l'image de la carte
        rrt : 'epique', // Rareté de la carte
        cst : 3, // cout de la carte
        dsc : "On l'apelle le mini-trou noir. Pratique pour dépoussierrer l'arène ou aspirer les ennemies dans un trou sans fond", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        dmg : 44, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 5, // splash dmg ?
        xpr : 3, // Durée de vie
    },
    flutiste : {
        // caract d'affichage
        lbl : 'Flutiste',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/flutiste.svg',    // Url de l'image de la carte
        rrt : 'legendaire', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : "Le déploiement de cette carte engeandre un retard de 2 semaines dans la prodution des unités...", // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 100, // PV de l'unité
        dmg : 0, // Attaque de l'unité
        asp : 0, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    }
});