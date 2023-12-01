const logout = (req, res) => {
    if (req.cookies.jwt === undefined) {
        res.send("잘못된 접근입니다.");
    } else {
        res.cookie("jwt", "", { expires: new Date(0), httpOnly: true });
        res.send("로그아웃");
    }
};

module.exports = logout;
