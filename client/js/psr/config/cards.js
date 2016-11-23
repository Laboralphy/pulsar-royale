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
        atq : 0, // Attaque de l'unité
        asp : 0, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
     }
     */
    flutiste : {
        // caract d'affichage
        lbl : 'Flutiste',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/flutiste.svg',    // Url de l'image de la carte
        rrt : 'epique', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 100, // PV de l'unité
        atq : 0, // Attaque de l'unité
        asp : 0, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    missile : {
        // caract d'affichage
        lbl : 'Missile',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card1 : {
        // caract d'affichage
        lbl : 'Card1',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card2 : {
        // caract d'affichage
        lbl : 'Card2',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'legendaire', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card3 : {
        // caract d'affichage
        lbl : 'Card3',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card4 : {
        // caract d'affichage
        lbl : 'Card4',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card5 : {
        // caract d'affichage
        lbl : 'Card5',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'rare', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card6 : {
        // caract d'affichage
        lbl : 'Card6',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'epique', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card7 : {
        // caract d'affichage
        lbl : 'Card7',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card8 : {
        // caract d'affichage
        lbl : 'Card8',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    },
    card9 : {
        // caract d'affichage
        lbl : 'Card9',  // Nom de l'unité
        tpl : 'url',    // Url du template
        crd : 'svg/missile.svg',    // Url de l'image de la carte
        rrt : 'commune', // Rareté de la carte
        cst : 5, // cout de la carte
        dsc : 'Une description', // Description de la carte

        // caract Physiques
        lyr : 0, // Layer de progression de l'unité (-1 : ssol, 0 : sol, 1: air)
        lgt : 1, // Profondeur de l'unité (en lyr)
        hgt : 1, // Hauteur de l'unité (en case)
        wgt : 1, // Largeur de l'unité (en case)

        // caract de combat
        hp  : 400, // PV de l'unité
        atq : 25, // Attaque de l'unité
        asp : 1.2, // Vitesse d'attaque
        rng : 5, // Portée de l'unité
        aoe : 0, // splash dmg ?
        spd : 1, // Vitesse de déplacement de l'unité
    }
});