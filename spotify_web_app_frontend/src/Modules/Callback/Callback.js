import {completeLogin, getProfile} from '../SpotifyHelpers/SpotifyHelpers'
import { useEffect } from 'react'
import {useNavigate} from "react-router-dom";

export default function Page() {

    const navigate = useNavigate()

    useEffect(() => {
        completeLogin()
            .then(() => {
               navigate('/connections')
            }).then(() => {
            getProfile().then(() => {
                console.log('profile fetched')
            })
        })
            .catch((error) => {
                console.error(error)
                navigate('/')
            })
    }, [])

    return (
        <div>
            <div>
                <title>Logging you in...</title>
                <meta name="robots" content="noindex" />
            </div>

            <div  />

            <main className="p-2 flex flex-col max-w-xs mx-auto my-4 text-center space-y-4">
                <h1 className="text-4xl text-gray-600 animate-pulse">
                    Logging you in...
                </h1>
            </main>
        </div>
    )
}