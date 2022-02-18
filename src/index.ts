import { app } from "./controller/app";
import { checkinRouter } from "./controller/routes/checkinRouter";
import { classRouter } from "./controller/routes/classRouter";
import { planRouter } from "./controller/routes/planRouter";
import { userRouter } from "./controller/routes/userRouter";

app.use("/users", userRouter )
app.use("/plans", planRouter)
app.use("/classes", classRouter)
app.use("/checkins", checkinRouter)





