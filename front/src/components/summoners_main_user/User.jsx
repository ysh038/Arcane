import { useState, useEffect } from "react";
import { Bookmark, Autorenew } from "@mui/icons-material";
// import axios from "axios";
import Riot_API from "../../network/riotAPI";
import style from "./user.module.css";
// import TokenStorage from "../../db/token";
import DB from "../../db/db";

function User(props) {
    const [summoner, setSummoner] = useState({});
    const [bookToggle, setBookToggle] = useState(false);
    const [summName, setSummonerName] = useState("");
    const [profileLink, setProfileLink] = useState();
    const [summLevel, setLevel] = useState(0);
    const [isLogin, setLogin] = useState(false);
    const [userName, setuserName] = useState("");
    const riot = new Riot_API();
    const db = new DB();
    const bmTag = document.querySelector("." + style["bookMark"]);

    const summ = props.summonerData;
    const login = props.isLogin;
    const username = props.userName;

    const getSummonerInfo = async () => {
        const profile = await riot.getSummonerProfileIcon(summ.profileIconId);
        setSummonerName(summ.summonerName);
        setProfileLink(profile);
        setLevel(summ.level);
        if (username !== undefined && login === true) {
            setLogin(login);
            setuserName(username);
        }

        // topbar를 통해 유저 검색시 남아있을 active 클래스를 지워주고
        // 로그인된 유저의 디비에서 북마크 정보를 가져와서 북마크에
        // active 추가 여부 결정
        bmTag.classList.remove(style.active);
        if (login && username !== undefined) {
            console.log("로그인된 유저임");
            const sn = summ.summonerName;
            const un = username;
            await db
                .checkMarking(sn, un)
                .then((res) => {
                    if (res) bmTag.classList.add(style.active);
                    setBookToggle(res);
                })
                .catch((err) => console.log("user mark check error"));
        }

        setSummoner(summ);
    };

    const refresh = () => {
        const refreshIcon = document.querySelector("." + style["refreshIcon"]);
        refreshIcon.classList.add(style.active);
        const isEnd = props.isRefresh(true);
        isEnd.then((res) => refreshIcon.classList.remove(style.active));
    };

    const marking = (e) => {
        console.log("isLogin: " + isLogin);
        if (!isLogin) {
            alert("로그인이 필요한 기능입니다!");
            return;
        }

        if (bookToggle) {
            // 북마크 해제시
            db.bookMarkingDB(summoner.summonerName, userName).then(
                bmTag.classList.remove(style.active)
            );
        } else {
            // 북마크 설정시
            db.bookMarkingDB(summoner.summonerName, userName).then(
                bmTag.classList.add(style.active)
            );
        }

        setBookToggle(!bookToggle);
    };

    useEffect(() => {
        getSummonerInfo();
    }, [summ, isLogin, bookToggle]);

    return (
        <div className={style.userContainer}>
            <div className={style.userProfile}>
                <div className={style.icon}>
                    <img
                        src={profileLink}
                        alt="userProfile"
                        className={style.profileIcon}
                    />
                    <div>
                        <span className={style.level}>{summLevel}</span>
                    </div>
                </div>
            </div>
            <div className={style.userInfo}>
                <div className={style.nameAndBook}>
                    <span className={style.userName}>{summName}</span>
                    <Bookmark className={style.bookMark} onClick={marking} />
                </div>
                <div className={style.refreshHistory} onClick={refresh}>
                    <Autorenew className={style.refreshIcon} />
                    <span className={style.refreshLabel}>전적 갱신</span>
                </div>
            </div>
        </div>
    );
}

export default User;
