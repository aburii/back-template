import {ExecutionContext, Injectable} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {Reflector} from "@nestjs/core";
import {Observable} from "rxjs";

@Injectable()
export class JwtAtGuard extends AuthGuard('jwt') {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const isPublic = this.reflector.getAllAndOverride('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) return true;

        return super.canActivate(context);
    }
}
