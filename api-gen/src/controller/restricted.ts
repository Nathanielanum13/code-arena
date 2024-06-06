import { Response, Request } from "express"
import HealthCheck from "../utils/interface/HealthCheck"

export default (httpRequest: Request, httpResponse: Response) => {
    const response: any = {
        message: "Hello Pal"
    }
    return httpResponse.json(response)
}