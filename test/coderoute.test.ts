import { CoreRoute } from '../src/coreroute';
// import supertest from 'supertest'; // Si vous utilisez supertest pour envoyer des requêtes HTTP de test en Node.js

describe('CoreRoute', () => {
    let coreRoute: CoreRoute;
    // let server; // Pour stocker l'instance du serveur (si  listen retourne qqch pour le contrôler)
    let serverAddress: string; // Pour stocker l'adresse du serveur

    beforeEach(async () => {
        coreRoute = new CoreRoute(/* ... potentiellement des configurations ... */);
        // server = await coreRoute.listen(3000); // Si  listen retourne un objet serveur
        coreRoute.serveStaticFiles("./test/public");
        coreRoute.get('/api/users', (req, res) => {
            res.writeHead(200, {'Content-Type': 'application/json'});
            res.end(JSON.stringify({ message: 'User data' }));
        });
        coreRoute.listen(3000); // Si  listen est asynchrone et démarre le serveur directement
        serverAddress = 'http://localhost:3000'; // Adresse du serveur pour les requêtes de test
    });

    afterEach(async () => {
        coreRoute.close();
    });

    describe(' listen (méthode publique)', () => {
        it('should start an HTTP server that responds to requests for static files', async () => {
            // Simuler une requête GET pour un fichier HTML
            const response = await fetch(`${serverAddress}/index.html`); // Utilisez fetch (ou supertest) pour envoyer la requête HTTP
            expect(response.status).toBe(200); // Vérifier le statut 200 OK
            expect(response.headers.get('Content-Type')).toBe('text/html'); // Vérifier le Content-Type
            // ... potentiellement, vérifier le body de la réponse (si applicable) ...
        });

        it('should return 404 Not Found for non-existent files', async () => {
            const response = await fetch(`${serverAddress}/non-existent-file.txt`);
            expect(response.status).toBe(404); // Vérifier le statut 404 Not Found
        });

        it('should handle requests to API routes correctly', async () => {
            const apiResponse = await fetch(`${serverAddress}/api/users`);
            // const apiResponse = await supertest(server).get('/api/users');

            expect(apiResponse.status).toBe(200); // Vérifier le statut de la réponse API
            expect(apiResponse.headers.get('Content-Type')).toBe('application/json'); // Vérifier Content-Type API
            // ... Vérifier le body de la réponse API (JSON attendu) ...
        });

    });
});