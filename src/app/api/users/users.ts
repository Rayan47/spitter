import {initMongoose} from "../../../../lib/mongoose";
import User from "../../../../models/UserSchema";

export default async function handle(req, res){
    await initMongoose();
    const id = req.params.id;
    const user = await User.findById(id);
    res.json(user);
}