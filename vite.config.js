import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
    base: './',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                contact: resolve(__dirname, 'contact.html'),
                realisations: resolve(__dirname, 'realisations.html'),
                message: resolve(__dirname, 'message.html'),
                404: resolve(__dirname, '404.html'),
            },
        },
    },
})
