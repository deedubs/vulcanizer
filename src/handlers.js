

exports.create = {

    handler(request, reply) {

        let payload = request.payload;
        let processor = request.server.plugins.vulcanizer.processor;

        processor
            .process(payload)
            .then(() => {

                reply()
                    .code(204);
            });
    }
};
