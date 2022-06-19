module.exports = {
    apps: [
        {
            name: "ppl_backend",
            script: './app.js',
            watch: false,
            instances: 1,
            exec_mode: "cluster",
        }
    ]
}
