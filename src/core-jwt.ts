/**
 * Enum defining supported JWT algorithms in CoreJwt.
 *
 * @enum {string}
 * @readonly
 * @property {string} HS256 HMAC using SHA-256.
 * @property {string} RS256 RSA using SHA-256.
 */
export enum JwtAlgorithmType {
    HS256 = 'HS256',
    RS256 = 'RS256'
}

export class CoreJwt {
    static readonly SUPPORTED_ALGORITHMS: JwtAlgorithmType[] = [JwtAlgorithmType.HS256, JwtAlgorithmType.RS256]; // ✅ Constante statique pour la VALIDATION (avec enum)
    #key: string;
    #algorithm: JwtAlgorithmType; // Utilisation du type alias JwtAlgorithmType pour #algorithm

    /**
     * Constructor for the CoreJwt class.
     * Initializes a new CoreJwt instance with a secret key and algorithm.
     *
     * @param {string} secretOrPrivateKey - The secret key (for symmetric algorithms like HS256) or the private key (for asymmetric algorithms like RS256) as a string.
     *                                    For RS256, it's recommended to use the static factory method `getRS256`.
     * @param {JwtAlgorithmType} [algorithm='HS256'] - The JWT signing algorithm to use. Defaults to 'HS256' if not provided.
     *                                        Supported algorithms are {@link JwtAlgorithmType}.
     *
     * @throws {Error} If the provided algorithm is not a valid {@link JwtAlgorithmType}.
     *
     * @example
     * // Create a CoreJwt instance for HS256 algorithm
     * const jwtHS256 = new CoreJwt('your-secret-key');
     *
     * @example
     * // Create a CoreJwt instance for RS256 algorithm (using private key - recommended to use getRS256 factory)
     * const jwtRS256 = new CoreJwt('-----BEGIN RSA PRIVATE KEY...-----', 'RS256'); // Not recommended for direct constructor use in RS256
     */
    constructor(secretOrPrivateKey: string, algorithm: JwtAlgorithmType = 'HS256') { // Utilisation du type alias JwtAlgorithmType pour le paramètre algorithm
        this.#key = secretOrPrivateKey;
        if (algorithm === undefined) {
            this.#algorithm = 'HS256' as JwtAlgorithmType; 
        } else {
            this.#algorithm = algorithm;
        }
        const supportedAlgorithms: JwtAlgorithmType[] = ['HS256', 'RS256']; // Utilisation de JwtAlgorithmType[] pour le type du tableau
        if (!supportedAlgorithms.includes(this.#algorithm)) {
            throw new Error(`Unsupported JWT algorithm: ${this.#algorithm}. Supported algorithms are: ${supportedAlgorithms.join(', ')} (valid values from JwtAlgorithmType)`);
        }
    }

    /**
     * Signe un payload (charge utile) avec l'algorithme et la clé configurés.
     * @param {any} payload - Le payload JSON à signer. Peut être n'importe quel type de données sérialisable en JSON.
     * @returns {string} Le JWT signé, sous forme de chaîne de caractères.
     */
    sign(payload: any): string {
        try {
            // ⚠️ Intégrez ici la logique de signature JWT en utilisant une bibliothèque comme 'jsonwebtoken'
            //    Exemple avec jsonwebtoken (à adapter selon votre bibliothèque) :
            const signedToken = jwt.sign(
                payload,
                this.#key,
                { algorithm: this.#algorithm } // Utilisez this.#algorithm (type enum JwtAlgorithmType)
            );
            return signedToken;
        } catch (error) {
            console.error("Erreur lors de la signature JWT:", error);
            throw new Error(`JWT signing failed: ${error instanceof Error ? error.message : String(error)}`);
        }
    }

    /**
     * Vérifie un JWT en utilisant la clé et l'algorithme configurés.
     * @param {string} token - Le JWT à vérifier.
     * @returns {any} Le payload décodé si la signature est valide et la vérification réussit.
     * @throws {Error} Si la signature est invalide ou si une erreur survient lors de la vérification.
     */
    verify(token: string): any {
        try {
            // ⚠️ Intégrez ici la logique de vérification JWT en utilisant une bibliothèque comme 'jsonwebtoken'
            //    Exemple avec jsonwebtoken (à adapter selon votre bibliothèque) :
            const decodedPayload = jwt.verify(
                token,
                this.#key,
                { algorithms: [this.#algorithm] } // Utilisez un tableau contenant this.#algorithm (type enum JwtAlgorithmType)
            );
            return decodedPayload; // 🚀 Retourne le payload décodé si la vérification réussit
        } catch (error) {
            // ⚠️ Gérez les erreurs de vérification (par exemple, signature invalide, token expiré, etc.)
            console.error("Erreur lors de la vérification JWT:", error);
            throw new Error(`JWT verification failed: ${error instanceof Error ? error.message : String(error)}`); // ❌ Lancez une erreur si la vérification échoue
        }
    }

    /**
     * Décode un JWT sans vérifier sa signature. Permet d'inspecter le header et le payload.
     * @param {string} token - Le JWT à décoder.
     * @returns {any} Un objet contenant le header et le payload décodés.
     *                 Par exemple: { header: { ... }, payload: { ... } }.
     */
    decode(token: string): any;

    /**
     * Méthode factory statique pour créer une instance de CoreJwt configurée pour l'algorithme HS256.
     * @param {string} secretKey - La clé secrète à utiliser pour HS256.
     * @returns {CoreJwt} Une instance de CoreJwt configurée pour HS256.
     */
    static getHS256(secretKey: string): CoreJwt;

    /**
     * Méthode factory statique pour créer une instance de CoreJwt configurée pour l'algorithme RS256.
     * @param {string} publicKey - La clé publique RSA pour la vérification (et potentiellement pour le chiffrement JWE futur).
     * @param {string} privateKey - La clé privée RSA pour la signature et le chiffrement (si JWE est implémenté).
     * @returns {CoreJwt} Une instance de CoreJwt configurée pour RS256.
     */
    static getRS256(publicKey: string, privateKey: string): CoreJwt;
}