import Joi from "joi";

export const chatSchema =
    Joi.object({
        question: Joi.string()
            .required()
    });