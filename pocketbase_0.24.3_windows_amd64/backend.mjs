/*Alex RINGENBACH*/
import PocketBase from 'pocketbase';

const db = new PocketBase('http://127.0.0.1:8090');
try {
    const records = await pb.collection('evenement').getOne(id);

    console.table(Onerecord);
} catch (e) {
    console.error(e);
}
export async function getOffres() {
    try {
        let data = await db.collection('Maison').getFullList({
            sort: '-created',
        });

        data = data.map((maison) => {
            maison.image_maison_url = db.files.getURL(maison, maison.image_maison);
            maison.favori = maison.favori || false;
            return maison;
        });

        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la liste des maisons', error);
        return [];
    }
}

export async function getOffre(id) {
    try {
        let data = await db.collection('Maison').getOne(id);
        data.imageUrl = db.files.getURL(data, data.image);
        return data;
    } catch (error) {
        console.log('Une erreur est survenue en lisant la maison', error);
        return null;
    }
}
export async function bySurface(surface) {
    let data = await db.collection('Maison').getFullList({
        filter: `surface > ${surface}`
    });

    data = data.map((maison) => {
        maison.image_maison_url = db.files.getURL(maison, maison.image_maison);
        return maison;
    });

    return data;
}
export async function addOffre(house) {
    try {
        await db.collection('Maison').create(house);
        return {
            success: true,
            message: 'Offre ajoutée avec succès'
        };
    } catch (error) {
        console.log('Une erreur est survenue en ajoutant la maison', error);
        return {
            success: false,
            message: 'Une erreur est survenue en ajoutant la maison'
        };
    }
}

export async function filterByPrix(prixMin, prixMax) {
    try {
        let data = await pb.collection("Maison").getFullList({
            sort: "-created",
            filter: `prix >= ${prixMin} && prix <= ${prixMax}`,
        });
        data = data.map((maison) => {
            maison.imageUrl = pb.files.getURL(maison, maison.image);
            return maison;
        });
        return data;
    } catch (error) {
        console.log(
            "Une erreur est survenue en filtrant la liste des maisons",
            error,
        );
        return [];
    }
}

export async function setFavori(house) {
    await pb.collection('Maison').update(house.id, { favori: !house.favori });
}
export async function allArtists() {
    try {
        let artists = await pb.collection("agent").getFullList();
        return artists
    } catch (error) {
        console.error("error allAgent: ", error);
        return null;
    }
}

export async function allEventsByAgent(agentId) {
    try {
        let events = await pb.collection("events").getFullList({
            filter: `agent = "${agentId}"`,
            expand: "agent",
        });
        events = events.map((event) => {
            event.img = pb.files.getURL(event, event.image);
            return event;
        });
        return events;
    } catch (error) {
        console.error("error allEventsByAgent: ", error);
        return [];
    }
}

export function getImageUrl(record, imageField) {
    try {
        console.log("record", record, "imageField", imageField);

        return pb.files.getURL(record, imageField);
    } catch (error) {
        console.error("error getImageUrl: ", error);
        return record.id;
    }
}