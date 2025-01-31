import PocketBase from 'pocketbase';
const pb = new PocketBase('http://127.0.0.1:8090');

try {
    const records = await pb.collection('evenement').getOne(id);

    console.table(Onerecord);
} catch (e) {
    console.error(e);
}