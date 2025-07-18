const express = req('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Server is ready for service...");
});

router.get("/user", (req, res) => {
    const users = [
        {
            id: 1,
            email: "john@gmail.com",
            username: "johnd",
            password: "m38rmF$",
            name: {
                firstname: "john",
                lastname: "doe"
            }
        },
        {
            id: 2,
            email: "morrison@gmail.com",
            username: "mor_2314",
            password: "83r5^_",
            name: {
                firstname: "david",
                lastname: "morrison"
            }
        },
        {
            id: 3,
            email: "kevin@gmail.com",
            username: "kevinryan",
            password: "kev02937@",
            name: {
                firstname: "kevin",
                lastname: "ryan"
            }
        },
        {
            id: 4,
            email: "don@gmail.com",
            username: "donero",
            password: "ewedon",
            name: {
                firstname: "don",
                lastname: "romer"
            }
        },
        {
            id: 5,
            email: "derek@gmail.com",
            username: "derek",
            password: "jklg*_56",
            name: {
                firstname: "derek",
                lastname: "powell"
            }
        },
    ];

    res.json(users);
});

module.exports = router;
