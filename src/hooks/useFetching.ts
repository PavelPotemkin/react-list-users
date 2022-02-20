import {useState} from "react";

export const useFetching = (callback: any) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const fetching = async (...args: []) => {
        try {
            setIsLoading(true)
            // Чтобы увидеть лоадер
            await Promise.all([
              callback(...args),
                new Promise(resolve => {
                    setTimeout(() => resolve(''), 1000)
                })
              ])
        } catch (e: any) {
            setError(e.message);
        } finally {
            setIsLoading(false)
        }
    }

    return [fetching, isLoading, error]
}
