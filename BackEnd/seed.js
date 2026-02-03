const {
    sequelize,
    Utilisateur,
    Salle,
    Reservation,
    Avis,
} = require("./models");

async function seed() {
    try {
        await sequelize.sync();

        const [admin] = await Utilisateur.findOrCreate({
            where: { email: "admin@example.com" },
            defaults: {
                nom: "Admin",
                prenom: "System",
                email: "admin@example.com",
                mot_de_passe: "Admin123!",
                role: "administrateur",
                isActive: true,
            },
        });

        const [proprietaire] = await Utilisateur.findOrCreate({
            where: { email: "proprietaire@example.com" },
            defaults: {
                nom: "Proprietaire",
                prenom: "Alice",
                email: "proprietaire@example.com",
                mot_de_passe: "Prop123!",
                role: "proprietaire",
                isActive: true,
            },
        });

        const [client] = await Utilisateur.findOrCreate({
            where: { email: "client@example.com" },
            defaults: {
                nom: "Client",
                prenom: "Bob",
                email: "client@example.com",
                mot_de_passe: "Client123!",
                role: "client",
                isActive: true,
            },
        });

        const sallesCount = await Salle.count();
        let salles = [];
        if (sallesCount === 0) {
            salles = await Salle.bulkCreate([
                {
                    nom: "Salle Atlas",
                    descrption: "Salle lumineuse pour réunions et séminaires.",
                    capacite: 50,
                    prix: 120.0,
                    adresse: "Rue 1, Alger",
                    proprietaireId: proprietaire.id,
                },
                {
                    nom: "Salle Oasis",
                    descrption: "Salle polyvalente avec équipement audio/vidéo.",
                    capacite: 120,
                    prix: 250.0,
                    adresse: "Rue 2, Oran",
                    proprietaireId: proprietaire.id,
                },
            ]);
        } else {
            salles = await Salle.findAll({ limit: 2 });
        }

        const reservationsCount = await Reservation.count();
        if (reservationsCount === 0 && salles.length > 0) {
            const now = new Date();
            const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
            const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);

            await Reservation.bulkCreate([
                {
                    date_debut: tomorrow,
                    date_fin: nextWeek,
                    utilisateurId: client.id,
                    salleId: salles[0].id,
                },
            ]);
        }

        const avisCount = await Avis.count();
        if (avisCount === 0 && salles.length > 0) {
            await Avis.bulkCreate([
                {
                    note: 5,
                    commentaire: "Excellente salle, très propre et bien équipée.",
                    utilisateurId: client.id,
                    salleId: salles[0].id,
                },
                {
                    note: 4,
                    commentaire: "Bonne salle, mais le parking est limité.",
                    utilisateurId: client.id,
                    salleId: salles[1] ? salles[1].id : salles[0].id,
                },
            ]);
        }

        console.log("Seed completed successfully.");
        console.log("Comptes de test:");
        console.log("- admin@example.com / Admin123!");
        console.log("- proprietaire@example.com / Prop123!");
        console.log("- client@example.com / Client123!");
    } catch (error) {
        console.error("Seed failed:", error);
        process.exitCode = 1;
    } finally {
        await sequelize.close();
    }
}

seed();
