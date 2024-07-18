import {http, HttpResponse} from 'msw'

export const handlers = [// Intercept "GET https://example.com/user" requests...
    http.post('/login', async ({request}) => {
        // ...and respond to them using this JSON response.
        let body = await request.json();
        if (body.code !== 'asdf') {
            return HttpResponse.json(null, {
                status: 401, statusText: 'Verification code error',
            })
        } else if (body.username === 'admin' && body.password === '12345678') {
            return HttpResponse.json({
                'token': '123456'
            }, {
                status: 200, statusText: 'Login success',
            })
        } else {
            return HttpResponse.json(null, {
                status: 401, statusText: 'Username or password error',
            })
        }
    }),]

export const defaultHandlers = [];
