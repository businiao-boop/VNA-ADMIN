import { Controller, Get } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";

@Controller("demo")
export class DemoController {
  constructor(private readonly demoService: DemoService) {}

  @Get()
  @ApiOperation({ summary: "返回 Hello World 文本" }) // ✅ Swagger 的接口说明
  getHello() {
    return { message: "Hello World!" };
  }
}
