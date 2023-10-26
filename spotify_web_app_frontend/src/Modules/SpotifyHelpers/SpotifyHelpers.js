/**
 * @param {number} size
 */
function randomBytes(size) {
    return crypto.getRandomValues(new Uint8Array(size))
}

/**
 * @param {Uint8Array} bytes
 */
function base64url(bytes) {
    return btoa(String.fromCharCode(...bytes))
        .replace(/=/g, '')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
}

/**
 * https://tools.ietf.org/html/rfc7636#section-4.2
 * @param {string} code_verifier
 */
async function generateCodeChallenge(code_verifier) {
    const codeVerifierBytes = new TextEncoder().encode(code_verifier)
    const hashBuffer = await crypto.subtle.digest('SHA-256', codeVerifierBytes)
    return base64url(new Uint8Array(hashBuffer))
}

/**
 * @param {RequestInfo} input
 * @param {RequestInit} [init]
 */
async function fetchJSON(input, init) {
    const response = await fetch(input, init)
    const body = await response.json()
    if (!response.ok) {
        throw new ErrorResponse(response, body)
    }
    return body
}

class ErrorResponse extends Error {
    /**
     * @param {Response} response
     * @param {any} body
     */
    constructor(response, body) {
        super(response.statusText)
        this.status = response.status
        this.body = body
    }
}

export async function beginLogin() {
    // https://tools.ietf.org/html/rfc7636#section-4.1
    const code_verifier = base64url(randomBytes(96))
    const state = base64url(randomBytes(96))

    const params = new URLSearchParams({
        client_id: '4e8f8455d67249839bef6a8dc50cabb7', // need to get spotify id
        response_type: 'code',
        redirect_uri: 'http://localhost:3000/callback',
        code_challenge_method: 'S256',
        code_challenge: await generateCodeChallenge(code_verifier),
        state: state,
        scope: '',
    })

    sessionStorage.setItem('code_verifier', code_verifier)
    sessionStorage.setItem('state', state)

    window.location.href = `https://accounts.spotify.com/authorize?${params}`
}

export async function completeLogin() {
    const code_verifier = window.sessionStorage.getItem('code_verifier')
    const state = window.sessionStorage.getItem('state')

    const urlParams = new URLSearchParams(window.location.search);
    let code = urlParams.get('code');
    console.log("DODE", code)
    const params = new URLSearchParams();

    params.append("client_id", '4e8f8455d67249839bef6a8dc50cabb7');
    params.append("grant_type", "authorization_code");
    params.append("code", code);
    params.append("redirect_uri", "http://localhost:3000/callback");
    params.append("code_verifier", code_verifier);

    const result = await fetch("https://accounts.spotify.com/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: params
    });

    const { access_token } = await result.json();
    return access_token;
}

export function logout() {
   try {
       window.localStorage.removeItem('tokenSet')
   } catch(e){
       console.error(e)
   }
}

/**
 * @param {RequestInfo} input
 */
export async function fetchWithToken(input) {
    const accessToken = await getAccessToken()

    if (!accessToken) {
        throw new ErrorResponse(new Response(undefined, { status: 401 }), {})
    }

    return fetchJSON(input, {
        headers: { Authorization: `Bearer ${accessToken}` },
    })
}

/**
 * @param {{headers: {"Content-Type": string}, method: string, body: module:url.URLSearchParams}} params
 * @returns {Promise<string>}
 */
async function createAccessToken(params) {

    try {
        const response = await fetchJSON('https://accounts.spotify.com/api/token', {
            method: 'POST',
            body: new URLSearchParams({
                client_id: '4e8f8455d67249839bef6a8dc50cabb7'
                ,
                ...params,
            }),
        })

        console.log("response", response)

        const accessToken = response.access_token
        const expires_at = Date.now() + 1000 * response.expires_in


        window.localStorage.setItem('tokenSet', JSON.stringify({ ...response, expires_at }))

        return accessToken
    } catch (e) {
        console.error(e)
    }
}

/**
 * @returns {Promise<string>}
 */
 async function getAccessToken() {
    let tokenSet = JSON.parse(window.localStorage.getItem('tokenSet'))

    if (!tokenSet) return

    if (tokenSet.expires_at < Date.now()) {
        tokenSet = await createAccessToken({
            grant_type: 'refresh_token',
            refresh_token: tokenSet.refresh_token,
        })
    }

    return tokenSet.access_token
}

export async function getProfile() {
    const access_token = localStorage.getItem('access_token');

    const response = await fetch('https://api.spotify.com/v1/me', {
        headers: {
            Authorization: 'Bearer ' + access_token
        }
    });

    const data = await response.json();
    console.log(data)
}