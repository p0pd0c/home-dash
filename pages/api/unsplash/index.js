export default function handler(req, res) {
    if(req.method === "GET") {
        return res.status(200).json({ message: "hi" })
    }

    return res.status(403).json({ message: "NOT ALLOWED!" })

}