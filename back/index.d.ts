declare module "fastify" {
    interface FastifyRequest {
        incomingFiles: MultipartFile[];
    }
}