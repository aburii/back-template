import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import { IPayload } from "@app/user";

export const RequestUser = createParamDecorator(
    (data: string | undefined, context: ExecutionContext) => {
        const req = context.switchToHttp().getRequest();
        if (!data)
            return req.user;
        return req.user[data];
    }
)