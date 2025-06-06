document.addEventListener('DOMContentLoaded', () => {
    // Game State Variables for clicker sound
    let isClickerQuackEnabled = true;
    const clickerQuackSound = new Audio('https://www.myinstants.com/media/sounds/quack.mp3');
    clickerQuackSound.preload = 'auto'; // Optional: helps ensure sound is ready
    clickerQuackSound.load(); // Added line

    // DOM Elements
    const clickableDuckV2 = document.getElementById('clickableDuckV2');
    if (clickableDuckV2) { clickableDuckV2.src = duckClosed; }

    // Implement Click Animation:
    if (clickableDuckV2) {
        clickableDuckV2.addEventListener('mousedown', () => {
            clickableDuckV2.src = duckOpen;
            // Play quack sound if enabled (existing logic)
            if (isClickerQuackEnabled && clickerQuackSound) {
                clickerQuackSound.currentTime = 0; // Rewind to start
                clickerQuackSound.play().catch(error => console.error("Error playing quack sound:", error));
            }
        });
    }

    if (clickableDuckV2) {
        clickableDuckV2.addEventListener('mouseup', () => {
            clickableDuckV2.src = duckClosed;
        });
    }

    const qpAmountDisplay = document.getElementById('qpAmount');
    const qpPerSecondDisplay = document.getElementById('qpPerSecond');
    const qpPerClickDisplay = document.getElementById('qpPerClick');
    const generatorsListContainer = document.getElementById('generatorsListContainer');
    const upgradesListContainer = document.getElementById('upgradesListContainer');
    const gfUpgradesListContainer = document.getElementById('gfUpgradesListContainer');
    const saveGameButton = document.getElementById('saveGameButton');
    const loadGameButton = document.getElementById('loadGameButton');
    const resetGameButton = document.getElementById('resetGameButton');
    const goldenFeathersDisplay = document.getElementById('goldenFeathersDisplay');
    const rebirthButton = document.getElementById('rebirthButton');
    const gfOnRebirthDisplay = document.getElementById('gfOnRebirthDisplay');
    const playerLevelDisplay = document.getElementById('playerLevelDisplay');
    const nextLevelQPDisplay = document.getElementById('nextLevelQPDisplay');

    const celestialPortalSection = document.getElementById('celestialPortalSection');
    const ascendToHeavenButton = document.getElementById('ascendToHeavenButton');
    const superLevelDisplayArea = document.getElementById('superLevelDisplayArea');
    const superLevelTitle = document.getElementById('superLevelTitle');
    const superLevelContent = document.getElementById('superLevelContent');
    const returnToNormalPlaneButton = document.getElementById('returnToNormalPlaneButton');
    const duckClickerGameArea = document.getElementById('duckClickerGame');

    const SAVE_KEY = 'waefreBeornDuckClickerSaveV2';

    // YouTube Meme Cavern URLs
    const youtubeVideoURLs = [
        "https://www.youtube.com/watch?v=MW21lp833Vo", "https://www.youtube.com/watch?v=YAg-WauGrLU", "https://www.youtube.com/watch?v=xMoDvZJE19E",
        "https://www.youtube.com/watch?v=Pbkn21NNduc", "https://www.youtube.com/watch?v=SowxsXTTDo4", "https://www.youtube.com/watch?v=wYi24D9lHqc",
        "https://www.youtube.com/watch?v=J1c2KzJbcGA", "https://www.youtube.com/watch?v=w7-jUxadAFQ", "https://www.youtube.com/watch?v=VfPmURHkOsc",
        "https://www.youtube.com/watch?v=O3saUejQlLw", "https://www.youtube.com/watch?v=wtUMQZqI3x0", "https://www.youtube.com/watch?v=MXgnIP4rMoI",
        "https://www.youtube.com/watch?v=sT0Qgy6gv_4", "https://www.youtube.com/watch?v=_7TacvYrnjI", "https://www.youtube.com/watch?v=LZgeIReY04c",
        "https://www.youtube.com/watch?v=RCmkw-m2mZY", "https://www.youtube.com/watch?v=jp1yclQXd1Q", "https://www.youtube.com/watch?v=VwUDD5xaxfg",
        "https://www.youtube.com/watch?v=wqTpHhaKtL8", "https://www.youtube.com/watch?v=iRZ2Sh5-XuM", "https://www.youtube.com/watch?v=bPHtAHxB3iI",
        "https://www.youtube.com/watch?v=z_mhFOyLQBg", "https://www.youtube.com/watch?v=yr_Rpk9HR1g", "https://www.youtube.com/watch?v=YX2IQG4wTCE",
        "https://www.youtube.com/watch?v=7z00nX1zqo4", "https://www.youtube.com/watch?v=4ShACteRduY", "https://www.youtube.com/watch?v=erh2ngRZxs0",
        "https://www.youtube.com/watch?v=Ns7Z8ag4oSY", "https://www.youtube.com/watch?v=TdN4VoGRSzI", "https://www.youtube.com/watch?v=V-fRuoMIfpw",
        "https://www.youtube.com/watch?v=ql5FDMblr3Y", "https://www.youtube.com/watch?v=c38_1E_esPc", "https://www.youtube.com/watch?v=3z2j6F8fZII",
        "https://www.youtube.com/watch?v=-m2fVWj99x4", "https://www.youtube.com/watch?v=FSt1ptsOjL0", "https://www.youtube.com/watch?v=fWlHjpKmvh8",
        "https://www.youtube.com/watch?v=oFqQTU1lxC0", "https://www.youtube.com/watch?v=iPuTYsiLhzA", "https://www.youtube.com/watch?v=-Gq68u-f6X0",
        "https://www.youtube.com/watch?v=m24DPDKZ4zA", "https://www.youtube.com/watch?v=KfymmFs1kJg", "https://www.youtube.com/watch?v=WNmCm4oyrkY",
        "https://www.youtube.com/watch?v=8MExK3btN6Y", "https://www.youtube.com/watch?v=SR6FKTA2o2Q", "https://www.youtube.com/watch?v=aRsWk4JZa5k",
        "https://www.youtube.com/watch?v=Bvj4BKmW_Dk", "https://www.youtube.com/watch?v=1fQefWjcjFY", "https://www.youtube.com/watch?v=q-Hjl5-s-p4",
        "https://www.youtube.com/watch?v=io5d-aAck_8", "https://www.youtube.com/watch?v=KY_nkn5ShfM", "https://www.youtube.com/watch?v=tYzMYcUty6s",
        "https://www.youtube.com/watch?v=eqsAvKqqf2g", "https://www.youtube.com/watch?v=n-0C32d_q5w", "https://www.youtube.com/watch?v=YCeQLeQiRP4",
        "https://www.youtube.com/watch?v=g7_VlmEamUQ", "https://www.youtube.com/watch?v=NmPxPLkYZaw", "https://www.youtube.com/watch?v=rtChPB6NjJY",
        "https://www.youtube.com/watch?v=fSM_SO0GIBc", "https://www.youtube.com/watch?v=ZH0lMFQifa4", "https://www.youtube.com/watch?v=C2c2zVfxLo4",
        "https://www.youtube.com/watch?v=3qVPKzJXAkA", "https://www.youtube.com/watch?v=kCeUvxRF0JI", "https://www.youtube.com/watch?v=MD7-Le_Y6vM",
        "https://www.youtube.com/watch?v=GoUWdzNp9SM", "https://www.youtube.com/watch?v=c_a7U8peVfY", "https://www.youtube.com/watch?v=a4uFJMNSthE",
        "https://www.youtube.com/watch?v=V5uHdQARB-o", "https://www.youtube.com/watch?v=AZYErjxUqyE", "https://www.youtube.com/watch?v=vZ_YpOvRd3o",
        "https://www.youtube.com/watch?v=cCvzNRcZMRQ", "https://www.youtube.com/watch?v=8YWl7tDGUPA", "https://www.youtube.com/watch?v=cuNhfSM-144",
        "https://www.youtube.com/watch?v=ixQkcuZhXg8", "https://www.youtube.com/watch?v=EWF8Nfm-LLk", "https://www.youtube.com/watch?v=W1fPM0KRcRc",
        "https://www.youtube.com/watch?v=v-RE7RUzjf8", "https://www.youtube.com/watch?v=8tfQJQ4SLyY", "https://www.youtube.com/watch?v=Zp4DDdbfBVg",
        "https://www.youtube.com/watch?v=HL1bOLu1AtU", "https://www.youtube.com/watch?v=9nKA2d1GkPE", "https://www.youtube.com/watch?v=jO5IaAKTKsQ",
        "https://www.youtube.com/watch?v=CG5bou0LSes", "https://www.youtube.com/watch?v=xvQUiX26RfE", "https://www.youtube.com/watch?v=zKa92AeSByo",
        "https://www.youtube.com/watch?v=MwBxDnL4PZE", "https://www.youtube.com/watch?v=6s2iwMFZk_Q", "https://www.youtube.com/watch?v=sGGkgIUGo4g",
        "https://www.youtube.com/watch?v=lFabsRFnWy0", "https://www.youtube.com/watch?v=UHe64dyhCGA", "https://www.youtube.com/watch?v=qEGUiZxHQws",
        "https://www.youtube.com/watch?v=Tj1H28KOzMM", "https://www.youtube.com/watch?v=bkxIHXKlkeo", "https://www.youtube.com/watch?v=mdsS7dLR-d8",
        "https://www.youtube.com/watch?v=U1SiveWVIIo", "https://www.youtube.com/watch?v=Luyla4FavTI", "https://www.youtube.com/watch?v=8XmkZ86Hkh4",
        "https://www.youtube.com/watch?v=tyR0tbuKn-c", "https://www.youtube.com/watch?v=yNtySt6Fg30", "https://www.youtube.com/watch?v=vCSP1THD9cA",
        "https://www.youtube.com/watch?v=XYQnkBkwnFE", "https://www.youtube.com/watch?v=bEgeh5hA5ko", "https://www.youtube.com/watch?v=QX1SojKfgNI",
        "https://www.youtube.com/watch?v=gNM1J5eCqjg", "https://www.youtube.com/watch?v=l1CCIfFenDE", "https://www.youtube.com/watch?v=-Z4jx5VMw8M",
        "https://www.youtube.com/watch?v=nBHkIWAJitg", "https://www.youtube.com/watch?v=oeb5LdAyLC8", "https://www.youtube.com/watch?v=LA4CTzhrLu8",
        "https://www.youtube.com/watch?v=dJYs8eSPgYM", "https://www.youtube.com/watch?v=aFbuSShYKpc", "https://www.youtube.com/watch?v=v_NrcbOw29s",
        "https://www.youtube.com/watch?v=ssBFgDOlhM8", "https://www.youtube.com/watch?v=BgNFqUuEJKk", "https://www.youtube.com/watch?v=iJ5EZBQE2P4",
        "https://www.youtube.com/watch?v=Qji2-gTOhSA", "https://www.youtube.com/watch?v=3Yqm8_IuEns", "https://www.youtube.com/watch?v=dPvRDu6UddI",
        "https://www.youtube.com/watch?v=m8aaoC2hrlc", "https://www.youtube.com/watch?v=xy6J4e1z4Lc", "https://www.youtube.com/watch?v=0Wc2Og4vr2I",
        "https://www.youtube.com/watch?v=Gmg1nQfoh7o", "https://www.youtube.com/watch?v=ZANqANlTkC8", "https://www.youtube.com/watch?v=q1ywTBzLFuQ",
        "https://www.youtube.com/watch?v=oDmJtfejeRk", "https://www.youtube.com/watch?v=Ze0d_GzIz1M", "https://www.youtube.com/watch?v=2uh2YSqsFU0",
        "https://www.youtube.com/watch?v=XE1XE6Thp9E", "https://www.youtube.com/watch?v=9aEbI9c1DgA", "https://www.youtube.com/watch?v=_Y6cNrBJiFU",
        "https://www.youtube.com/watch?v=IB3_Dvpe_9A", "https://www.youtube.com/watch?v=tRxDNVFxYVA", "https://www.youtube.com/watch?v=aIA0mRCj14I",
        "https://www.youtube.com/watch?v=JUaUm0mrMWA", "https://www.youtube.com/watch?v=LWeDSHyg-tA", "https://www.youtube.com/watch?v=B_XdA6qbmKI",
        "https://www.youtube.com/watch?v=5qyxvdksDKQ", "https://www.youtube.com/watch?v=9KzMz0OUIMI", "https://www.youtube.com/watch?v=8GeFk3JZxjs",
        "https://www.youtube.com/watch?v=qtxANvS0vME", "https://www.youtube.com/watch?v=Bkq1PAyGuZY", "https://www.youtube.com/watch?v=Pmkv-GO9pl4",
        "https://www.youtube.com/watch?v=JSAVkFsOITU", "https://www.youtube.com/watch?v=HspSi4l0yd4", "https://www.youtube.com/watch?v=LsovfpizZP0",
        "https://www.youtube.com/watch?v=mUAZoWf-FJY", "https://www.youtube.com/watch?v=5v_v7SHJuw4", "https://www.youtube.com/watch?v=qTqVsdjvzdw",
        "https://www.youtube.com/watch?v=KDMMmIoq37M", "https://www.youtube.com/watch?v=kBnrHHbnxqg", "https://www.youtube.com/watch?v=ER9GCnOLRD4",
        "https://www.youtube.com/watch?v=Rwlcsl5h40Y", "https://www.youtube.com/watch?v=BgTfhUn_3Uk", "https://www.youtube.com/watch?v=F0-ZwT7OPSY",
        "https://www.youtube.com/watch?v=GKNB7Eid-ek", "https://www.youtube.com/watch?v=uiriZaiZDms", "https://www.youtube.com/watch?v=1tLyn1R0eR8",
        "https://www.youtube.com/watch?v=kmeBzO-6PBU", "https://www.youtube.com/watch?v=19ZFHaQMifU", "https://www.youtube.com/watch?v=xdiBNmEs_yM",
        "https://www.youtube.com/watch?v=iC4_XmW1rBc", "https://www.youtube.com/watch?v=Hn8_6Dq4TVI", "https://www.youtube.com/watch?v=Z47xwzYGop8",
        "https://www.youtube.com/watch?v=-lXKAnSEds8", "https://www.youtube.com/watch?v=C9oVVBKiWnY", "https://www.youtube.com/watch?v=7W9XiEZ4XKY",
        "https://www.youtube.com/watch?v=7sqwDBIqVjc", "https://www.youtube.com/watch?v=wgX4azFYqsM", "https://www.youtube.com/watch?v=aN1ITUx1Kp8",
        "https://www.youtube.com/watch?v=_zxlhlsS28U", "https://www.youtube.com/watch?v=uwmeH6Rnj2E", "https://www.youtube.com/watch?v=w7PRw6y7lck",
        "https://www.youtube.com/watch?v=KK8NbVU23Ho", "https://www.youtube.com/watch?v=15tW4dEK7A4", "https://www.youtube.com/watch?v=DHl6Jsgq600",
        "https://www.youtube.com/watch?v=rhC9KVo7S0c", "https://www.youtube.com/watch?v=r1JcqCEz8go", "https://www.youtube.com/watch?v=ovTHQSly5Dw",
        "https://www.youtube.com/watch?v=g8dv8Y_Z3VE", "https://www.youtube.com/watch?v=NYtQXtUMWvQ", "https://www.youtube.com/watch?v=lmaslSXD_RQ",
        "https://www.youtube.com/watch?v=LIMGskVs8iE", "https://www.youtube.com/watch?v=uiPDu6fRZBQ", "https://www.youtube.com/watch?v=8MfawuZ6mHs",
        "https://www.youtube.com/watch?v=tXyVnrFyxis", "https://www.youtube.com/watch?v=GMjg1od9URA", "https://www.youtube.com/watch?v=uOa-ObWPAKg",
        "https://www.youtube.com/watch?v=8B8ZlLT9ZH0", "https://www.youtube.com/watch?v=7XRczBvWn7o", "https://www.youtube.com/watch?v=7yd9BQMZOEM",
        "https://www.youtube.com/watch?v=d0ncextKWgA", "https://www.youtube.com/watch?v=7lQ11bTohCk", "https://www.youtube.com/watch?v=CFPA0QN1eOo",
        "https://www.youtube.com/watch?v=K_gECeS0kxo", "https://www.youtube.com/watch?v=iZuSU8xOFNM", "https://www.youtube.com/watch?v=juQyy00x-Mw",
        "https://www.youtube.com/watch?v=7j4N_qeLRLI", "https://www.youtube.com/watch?v=xjOVqBm-Lu8", "https://www.youtube.com/watch?v=WJ2sas_KHPE",
        "https://www.youtube.com/watch?v=BZWyv7QGA1g", "https://www.youtube.com/watch?v=kmOHV_ElBz8", "https://www.youtube.com/watch?v=T-w0h3g07aE",
        "https://www.youtube.com/watch?v=d2kQubwQnHg", "https://www.youtube.com/watch?v=U0WGfuPqYhg", "https://www.youtube.com/watch?v=zwDsLhI62Uo",
        "https://www.youtube.com/watch?v=yAOgYQyGyZI", "https://www.youtube.com/watch?v=tty-in1AQqE", "https://www.youtube.com/watch?v=W97Hztb6_5I",
        "https://www.youtube.com/watch?v=t255dpa-dVU", "https://www.youtube.com/watch?v=t5xlgeD-Y1g", "https://www.youtube.com/watch?v=WbX6sed6k94",
        "https://www.youtube.com/watch?v=dyJGik9ydm0", "https://www.youtube.com/watch?v=yLHyn6_7O74", "https://www.youtube.com/watch?v=T3W4Mx2aSGE",
        "https://www.youtube.com/watch?v=KsTHGyb9aZw", "https://www.youtube.com/watch?v=ly3NNdeSjZ0", "https://www.youtube.com/watch?v=5yf1zZFHrvU",
        "https://www.youtube.com/watch?v=5t8fmdy8o-c", "https://www.youtube.com/watch?v=Z_zDpLBJxlM", "https://www.youtube.com/watch?v=y-P0m0M_8pc",
        "https://www.youtube.com/watch?v=p8jOgEnuOjQ", "https://www.youtube.com/watch?v=ZxnbzrdYvSY", "https://www.youtube.com/watch?v=B2rox2njKjA",
        "https://www.youtube.com/watch?v=UkH-eQZ0YgA", "https://www.youtube.com/watch?v=QHuQuvn0hE0", "https://www.youtube.com/watch?v=wHdTWnpAz_A",
        "https://www.youtube.com/watch?v=A6o39MjXnHA", "https://www.youtube.com/watch?v=tAp9md9Amzg", "https://www.youtube.com/watch?v=R5EaE_fxj4c",
        "https://www.youtube.com/watch?v=uKkPliils4s", "https://www.youtube.com/watch?v=t7pXioHcQf8", "https://www.youtube.com/watch?v=XOeZ1ZHNK3c",
        "https://www.youtube.com/watch?v=KfXiiuYi5Ek", "https://www.youtube.com/watch?v=x9XDjpiCMTw", "https://www.youtube.com/watch?v=12P0Y-wlb6k",
        "https://www.youtube.com/watch?v=w2DYQkBBvA0", "https://www.youtube.com/watch?v=2QidC6JnAbo", "https://www.youtube.com/watch?v=KiPIVahBTDo",
        "https://www.youtube.com/watch?v=thOyW1nqDMw", "https://www.youtube.com/watch?v=P1-uCWIjZWM", "https://www.youtube.com/watch?v=roUOBx8m9Yc",
        "https://www.youtube.com/watch?v=eTJUkc4Uzck", "https://www.youtube.com/watch?v=LMi_OwNASag", "https://www.youtube.com/watch?v=rGDgYwk1I9c",
        "https://www.youtube.com/watch?v=fb4xGirFOq8", "https://www.youtube.com/watch?v=J26gUgsTwT8", "https://www.youtube.com/watch?v=OQOcl5sSaN4",
        "https://www.youtube.com/watch?v=ZAAu1KRM5l0", "https://www.youtube.com/watch?v=XtBsSByQxH8", "https://www.youtube.com/watch?v=JQ4OeSFHk6k",
        "https://www.youtube.com/watch?v=hxBaviNDku0", "https://www.youtube.com/watch?v=IMn1ealC9fQ", "https://www.youtube.com/watch?v=cabqSFKQUeo",
        "https://www.youtube.com/watch?v=pxep18WL1us", "https://www.youtube.com/watch?v=sZr_XB2D4sk", "https://www.youtube.com/watch?v=WLeTxxppXCU",
        "https://www.youtube.com/watch?v=T5cFI9Gutto", "https://www.youtube.com/watch?v=pwoc6hRO5xs", "https://www.youtube.com/watch?v=jNfnqcfcFmE",
        "https://www.youtube.com/watch?v=EOnvAurkpBc", "https://www.youtube.com/watch?v=2yyHhQ6wD-c", "https://www.youtube.com/watch?v=NMwB7NySXyw",
        "https://www.youtube.com/watch?v=jLqciB_j-ZQ", "https://www.youtube.com/watch?v=rX6LCgw3N8E", "https://www.youtube.com/watch?v=kqK2u6x4k_o",
        "https://www.youtube.com/watch?v=QpS-G6J_Jz8", "https://www.youtube.com/watch?v=LncQayu5pFw", "https://www.youtube.com/watch?v=2K6GqUgdLoE",
        "https://www.youtube.com/watch?v=q-YiAppyZI4", "https://www.youtube.com/watch?v=RlGnGcvQsfA", "https://www.youtube.com/watch?v=LKhSsKnb6NQ",
        "https://www.youtube.com/watch?v=ZSu0smwFGDw", "https://www.youtube.com/watch?v=utDhNcdd9D0", "https://www.youtube.com/watch?v=XFEHa27TnYk",
        "https://www.youtube.com/watch?v=DAT5CKShfIc", "https://www.youtube.com/watch?v=w1sGZufANmE", "https://www.youtube.com/watch?v=N-ktmnq9sOI",
        "https://www.youtube.com/watch?v=HzRGkeVySqE", "https://www.youtube.com/watch?v=fV3nflAQ99w", "https://www.youtube.com/watch?v=NGdKN2HQLZU",
        "https://www.youtube.com/watch?v=pZPOTP2mo1A", "https://www.youtube.com/watch?v=DNyMMntgvIo", "https://www.youtube.com/watch?v=fhmeYoJZeOw",
        "https://www.youtube.com/watch?v=ska2Jl01nb0", "https://www.youtube.com/watch?v=-DNMCas0Bzo", "https://www.youtube.com/watch?v=_bZcjFNxWII",
        "https://www.youtube.com/watch?v=r9Q9LHQBDTs", "https://www.youtube.com/watch?v=08ZoRH8ZTKE", "https://www.youtube.com/watch?v=UyhrAQQ-pPY",
        "https://www.youtube.com/watch?v=t_rDbz6IPhA", "https://www.youtube.com/watch?v=RiC1Lj9-QAQ", "https://www.youtube.com/watch?v=cdE8mMDIXUM",
        "https://www.youtube.com/watch?v=Bcz0d9tlcPw", "https://www.youtube.com/watch?v=kSjFVH2Zc5E", "https://www.youtube.com/watch?v=ThWarW39Wb0",
        "https://www.youtube.com/watch?v=D2Sxa6VwDsA", "https://www.youtube.com/watch?v=4-j6VR6eTro", "https://www.youtube.com/watch?v=c5bnvlhIp7Q",
        "https://www.youtube.com/watch?v=AWPAIsiGA2g", "https://www.youtube.com/watch?v=vtcFza5Fdog", "https://www.youtube.com/watch?v=dHSUMkGdjwk",
        "https://www.youtube.com/watch?v=qQ2_iBcCtz4", "https://www.youtube.com/watch?v=pcMHw043xNs", "https://www.youtube.com/watch?v=fsF7enQY8uI",
        "https://www.youtube.com/watch?v=73GI6uS_4Ic", "https://www.youtube.com/watch?v=fpX7Um1derE", "https://www.youtube.com/watch?v=Mjg9DPmObwg",
        "https://www.youtube.com/watch?v=T2DNrJuG2Mw", "https://www.youtube.com/watch?v=ZyjCXFjFUFc", "https://www.youtube.com/watch?v=RT9gTBXOVAI",
        "https://www.youtube.com/watch?v=AQzG-H9Llz0", "https://www.youtube.com/watch?v=Mip_Z2KVYKw", "https://www.youtube.com/watch?v=GPUgjy-Pn-4",
        "https://www.youtube.com/watch?v=BuJcSZ8Ktek", "https://www.youtube.com/watch?v=_og10IZNM9o", "https://www.youtube.com/watch?v=yjE5FtmvWVg",
        "https://www.youtube.com/watch?v=RMDItOwN_SU", "https://www.youtube.com/watch?v=gJak2sRlELA", "https://www.youtube.com/watch?v=fgPKYzd6Wio",
        "https://www.youtube.com/watch?v=hCFZquAvf9w", "https://www.youtube.com/watch?v=0MGhovUxCaM", "https://www.youtube.com/watch?v=0g-6xLB9nNM",
        "https://www.youtube.com/watch?v=pj996UG4jYA", "https://www.youtube.com/watch?v=Vn48MZDowWw", "https://www.youtube.com/watch?v=dLrUo_3o9G4",
        "https://www.youtube.com/watch?v=8Uhos5GdDu0", "https://www.youtube.com/watch?v=_QpSq1m0RQk", "https://www.youtube.com/watch?v=HON8gKClwVA",
        "https://www.youtube.com/watch?v=F1sFUiZVbUE", "https://www.youtube.com/watch?v=eKRw0W6UVCQ", "https://www.youtube.com/watch?v=Nt36Nl79r_c",
        "https://www.youtube.com/watch?v=wixxlk_9e80", "https://www.youtube.com/watch?v=tYRGd7MF6sA", "https://www.youtube.com/watch?v=1auiSc1TYxA",
        "https://www.youtube.com/watch?v=smjjyxhoeTw", "https://www.youtube.com/watch?v=ZUxiKrOohkY", "https://www.youtube.com/watch?v=VSgv70CkAGs",
        "https://www.youtube.com/watch?v=S3z3r-DIQAw", "https://www.youtube.com/watch?v=IIbMDzYw_lE", "https://www.youtube.com/watch?v=hjNXog__sfo",
        "https://www.youtube.com/watch?v=Z3wrUxiSgZQ", "https://www.youtube.com/watch?v=An2cnVckKxw", "https://www.youtube.com/watch?v=Xud0YWhQsXc",
        "https://www.youtube.com/watch?v=uBoPMoO2I3s", "https://www.youtube.com/watch?v=5Y0SdxF0-pA", "https://www.youtube.com/watch?v=WTqq9UMZo3g",
        "https://www.youtube.com/watch?v=uKpOCbkzPOI", "https://www.youtube.com/watch?v=Z_pTdWN1fFY", "https://www.youtube.com/watch?v=RRwqftGrxf4",
        "https://www.youtube.com/watch?v=pTs5kD8_l7U", "https://www.youtube.com/watch?v=nNLDkZTovvU", "https://www.youtube.com/watch?v=DhjtFxl9Gs8",
        "https://www.youtube.com/watch?v=iH3c0zHU7TM", "https://www.youtube.com/watch?v=29e-DUjBPYQ", "https://www.youtube.com/watch?v=9qT51JUB9q8",
        "https://www.youtube.com/watch?v=1XEO3Y0BByk", "https://www.youtube.com/watch?v=EndzcnS9Jzw", "https://www.youtube.com/watch?v=lEyJRDBNXco",
        "https://www.youtube.com/watch?v=aeJUeZ6GTsg", "https://www.youtube.com/watch?v=DbABCGmeres", "https://www.youtube.com/watch?v=03iSx8J7JzI",
        "https://www.youtube.com/watch?v=3-rfBsWmo0M", "https://www.youtube.com/watch?v=etIkpIbzU4g", "https://www.youtube.com/watch?v=f6Qpyy74cFo",
        "https://www.youtube.com/watch?v=4Ooqcikvi1U", "https://www.youtube.com/watch?v=gNaSNta-0Ho", "https://www.youtube.com/watch?v=xchmuP_Ny_Y",
        "https://www.youtube.com/watch?v=8nAWIBs0DY4", "https://www.youtube.com/watch?v=5gEShPkvq_s", "https://www.youtube.com/watch?v=B2VSY8bavLg",
        "https://www.youtube.com/watch?v=Y4Z7Ds_yv8o", "https://www.youtube.com/watch?v=Ab6EhLqjZQ8", "https://www.youtube.com/watch?v=E4_Pd1kDojA",
        "https://www.youtube.com/watch?v=ELxZwcmN5yM", "https://www.youtube.com/watch?v=Wdi4MFA7ODA", "https://www.youtube.com/watch?v=VZr7uzw6gpg",
        "https://www.youtube.com/watch?v=tRn1fMLJXH8", "https://www.youtube.com/watch?v=UxBAY4nfRBU", "https://www.youtube.com/watch?v=doPwSn8TmUI",
        "https://www.youtube.com/watch?v=Py9U92xIrD8", "https://www.youtube.com/watch?v=u1txdg0hhDo", "https://www.youtube.com/watch?v=UVsK5ickEh8",
        "https://www.youtube.com/watch?v=bxRzsgtvakY", "https://www.youtube.com/watch?v=5uNExSMRVLs", "https://www.youtube.com/watch?v=v2IG7iSVOkY",
        "https://www.youtube.com/watch?v=MqYmYiQH8Ss", "https://www.youtube.com/watch?v=MoebHrLicE8", "https://www.youtube.com/watch?v=rwmUFTaI1m8",
        "https://www.youtube.com/watch?v=FYAW8h-vzKU", "https://www.youtube.com/watch?v=gzZRvJJu6ZQ", "https://www.youtube.com/watch?v=LktYtcK4cQQ",
        "https://www.youtube.com/watch?v=aB3E96uiWJU", "https://www.youtube.com/watch?v=a8addF6VJxc", "https://www.youtube.com/watch?v=249eY6GhU3w",
        "https://www.youtube.com/watch?v=L_OuM9cu-G8", "https://www.youtube.com/watch?v=CH7tlyvnKLQ", "https://www.youtube.com/watch?v=e-b9_Py-1Vo",
        "https://www.youtube.com/watch?v=WvWQBb2U-R0", "https://www.youtube.com/watch?v=LHVMwgUXhy8", "https://www.youtube.com/watch?v=wQ9XV_zbgIc",
        "https://www.youtube.com/watch?v=Al2QqHThvjM", "https://www.youtube.com/watch?v=w9zfAZfzli0", "https://www.youtube.com/watch?v=bSZeC6sj1r8",
        "https://www.youtube.com/watch?v=S-IwVBVdBRk", "https://www.youtube.com/watch?v=YhBZ0_G7I60", "https://www.youtube.com/watch?v=O1ke1XStr1w",
        "https://www.youtube.com/watch?v=BP9f_i1wFAo", "https://www.youtube.com/watch?v=EmEbCd6p2Ww", "https://www.youtube.com/watch?v=z_p4fd-QPDQ",
        "https://www.youtube.com/watch?v=xWyUs3CLE0Y", "https://www.youtube.com/watch?v=fwvKaHj_dco", "https://www.youtube.com/watch?v=yJPqypjaKUA",
        "https://www.youtube.com/watch?v=u34AtdEZYiA", "https://www.youtube.com/watch?v=Y5SVfJa7Y2A", "https://www.youtube.com/watch?v=Xn6yS0P9r6A",
        "https://www.youtube.com/watch?v=k_-Lyktkdhw", "https://www.youtube.com/watch?v=d2l01wNKiJk", "https://www.youtube.com/watch?v=HVxtOL_CzXc",
        "https://www.youtube.com/watch?v=v0lGQQjL-vc", "https://www.youtube.com/watch?v=LOM55iLEMVI", "https://www.youtube.com/watch?v=dvA4BJXy4p0",
        "https://www.youtube.com/watch?v=7Sf786cvrmc", "https://www.youtube.com/watch?v=yAyxdTXYZ7o", "https://www.youtube.com/watch?v=7WtJhdxoDso",
        "https://www.youtube.com/watch?v=06st7vKDzQ8", "https://www.youtube.com/watch?v=7csxLRm2yvM", "https://www.youtube.com/watch?v=D1jKupgoPNA",
        "https://www.youtube.com/watch?v=X5N9NLLfaxA", "https://www.youtube.com/watch?v=5nc7dcOzHLU", "https://www.youtube.com/watch?v=Oum9ahF0tNM",
        "https://www.youtube.com/watch?v=Y0zRZDAy_rk", "https://www.youtube.com/watch?v=jHOTNGodigI", "https://www.youtube.com/watch?v=3YbuaOZRYfw",
        "https://www.youtube.com/watch?v=qkR4YNgcmvk", "https://www.youtube.com/watch?v=Y3mZUJOz_LM", "https://www.youtube.com/watch?v=Bw_P11E5wYY",
        "https://www.youtube.com/watch?v=g01TCMmIIKc", "https://www.youtube.com/watch?v=y-xMUx02dfk", "https://www.youtube.com/watch?v=Uq_0RYEK2cs",
        "https://www.youtube.com/watch?v=Kg-HHXuOBlw", "https://www.youtube.com/watch?v=sWvzEDP2TBY", "https://www.youtube.com/watch?v=yt8w4agosxY",
        "https://www.youtube.com/watch?v=bSKxboFCH7U", "https://www.youtube.com/watch?v=SPMemmsVD0Y", "https://www.youtube.com/watch?v=BOAppbN0jdA",
        "https://www.youtube.com/watch?v=VElHakMPV4Q", "https://www.youtube.com/watch?v=unYR5yGpD0U", "https://www.youtube.com/watch?v=04--dI28Aag",
        "https://www.youtube.com/watch?v=siSRUmrhDQU", "https://www.youtube.com/watch?v=Czbp4FN7UzI", "https://www.youtube.com/watch?v=QWgSyp5VyQQ",
        "https://www.youtube.com/watch?v=q5t7zbSgEks", "https://www.youtube.com/watch?v=HOgzJJw2fpE", "https://www.youtube.com/watch?v=OvhcsZnELq8",
        "https://www.youtube.com/watch?v=G9psGXk_Fc8", "https://www.youtube.com/watch?v=of3Nb5IbvEQ", "https://www.youtube.com/watch?v=-lcV9WYD6T8",
        "https://www.youtube.com/watch?v=5GHbtOx8-cw", "https://www.youtube.com/watch?v=8ujGHnVCnM8", "https://www.youtube.com/watch?v=aDdovRUVcNE",
        "https://www.youtube.com/watch?v=nhjfJHv5OhI", "https://www.youtube.com/watch?v=Tud1BAFg-Bk", "https://www.youtube.com/watch?v=odhMmAPDc54",
        "https://www.youtube.com/watch?v=LXs1h97VsPM", "https://www.youtube.com/watch?v=XsNaLqPNAW0", "https://www.youtube.com/watch?v=NnWAwzaE2aw",
        "https://www.youtube.com/watch?v=wso8RR_9nr8", "https://www.youtube.com/watch?v=7Ek9-USDhjA", "https://www.youtube.com/watch?v=F87jhNVPX3M",
        "https://www.youtube.com/watch?v=zq4G78xfDKY", "https://www.youtube.com/watch?v=erc7gwnSf38", "https://www.youtube.com/watch?v=zYh4Jt_qCks",
        "https://www.youtube.com/watch?v=3s5o2uWhNe8", "https://www.youtube.com/watch?v=sDxE0ybs14o", "https://www.youtube.com/watch?v=pFa1sFO_n_w",
        "https://www.youtube.com/watch?v=LYS4QpGOFDs", "https://www.youtube.com/watch?v=CGEbkoWc9FQ", "https://www.youtube.com/watch?v=O8M63dHypGs",
        "https://www.youtube.com/watch?v=09GczeuPLDg", "https://www.youtube.com/watch?v=V0pYLjr9iHU", "https://www.youtube.com/watch?v=0Vb2VBERKZk",
        "https://www.youtube.com/watch?v=h7d-pR8dcm4", "https://www.youtube.com/watch?v=Cb6F14AGrvI", "https://www.youtube.com/watch?v=PbHLSx5lEvc",
        "https://www.youtube.com/watch?v=PVRZV3OZRH4", "https://www.youtube.com/watch?v=7Amg3OQaZrQ", "https://www.youtube.com/watch?v=jhpAe3reLxA",
        "https://www.youtube.com/watch?v=3ucyzWEfa0w", "https://www.youtube.com/watch?v=geTpYakrdrE", "https://www.youtube.com/watch?v=bd_1Bqqfd_o",
        "https://www.youtube.com/watch?v=u6IFhB7JM7I", "https://www.youtube.com/watch?v=72e0eiyYyjU", "https://www.youtube.com/watch?v=zVN5C3x4ZZo",
        "https://www.youtube.com/watch?v=l1heD4T8Yco", "https://www.youtube.com/watch?v=NjlGDiZ7zpA", "https://www.youtube.com/watch?v=sDLZ7EHu0T0",
        "https://www.youtube.com/watch?v=TZZa1Cx9jMo", "https://www.youtube.com/watch?v=zPdOPcNdmWc", "https://www.youtube.com/watch?v=qh5zQsQaFDU",
        "https://www.youtube.com/watch?v=SnCbAwhgeao", "https://www.youtube.com/watch?v=N0JccSNcyV4", "https://www.youtube.com/watch?v=vJlvG5vBWJI",
        "https://www.youtube.com/watch?v=BRl8l-6wOlM", "https://www.youtube.com/watch?v=tEg7rAGNfhY", "https://www.youtube.com/watch?v=E9GvYMfmfeY",
        "https://www.youtube.com/watch?v=aa9JH_iUSzg", "https://www.youtube.com/watch?v=AhcGUED7-3A", "https://www.youtube.com/watch?v=nLjS4B00tl0",
        "https://www.youtube.com/watch?v=Ba8e0GOvlRk", "https://www.youtube.com/watch?v=Iln6xfwYt8A", "https://www.youtube.com/watch?v=1hfDPpNaWV4",
        "https://www.youtube.com/watch?v=EPQWmW6s8-k", "https://www.youtube.com/watch?v=PFUX9mCZxfc", "https://www.youtube.com/watch?v=jrdL4aK_3XA",
        "https://www.youtube.com/watch?v=59tRaxf4uag", "https://www.youtube.com/watch?v=ggvwTHIlOkM", "https://www.youtube.com/watch?v=d1oZ6P8ZBoM",
        "https://www.youtube.com/watch?v=xm-4vQmgHFQ", "https://www.youtube.com/watch?v=9DCXk0YzH3Q", "https://www.youtube.com/watch?v=jpidp09pUBk",
        "https://www.youtube.com/watch?v=OPNZsKgzHGw", "https://www.youtube.com/watch?v=TP-2vB1BFZo", "https://www.youtube.com/watch?v=UDNyIaeZYbo",
        "https://www.youtube.com/watch?v=dslafN9afMg", "https://www.youtube.com/watch?v=aiM5KDuHrR4", "https://www.youtube.com/watch?v=cYE1fKO9ih0",
        "https://www.youtube.com/watch?v=rD35Q2bh5iI", "https://www.youtube.com/watch?v=w0qVciN4lTs", "https://www.youtube.com/watch?v=UGADuB0cWAQ",
        "https://www.youtube.com/watch?v=t_q7REtqKT8", "https://www.youtube.com/watch?v=OkHDTiDGQTA", "https://www.youtube.com/watch?v=mNe9a4BmJCw",
        "https://www.youtube.com/watch?v=5-9gIMmyW9g", "https://www.youtube.com/watch?v=vp0d18LT3os", "https://www.youtube.com/watch?v=FDw6aYgVPeM",
        "https://www.youtube.com/watch?v=st78jADELR0", "https://www.youtube.com/watch?v=E5G9_pvHLn8", "https://www.youtube.com/watch?v=z6VJAwSnxu0",
        "https://www.youtube.com/watch?v=fVoChhsLlpU", "https://www.youtube.com/watch?v=Iz8xVtPDAFg", "https://www.youtube.com/watch?v=4BHun2VVCsg",
        "https://www.youtube.com/watch?v=Nlbrx4Wrko8", "https://www.youtube.com/watch?v=vbSpYVumL6I", "https://www.youtube.com/watch?v=59z3izhxtGo",
        "https://www.youtube.com/watch?v=Kwui2biO0tU", "https://www.youtube.com/watch?v=yF8HU1ZeCow", "https://www.youtube.com/watch?v=FLCfCQQGAWU",
        "https://www.youtube.com/watch?v=0mt0EFau6xg", "https://www.youtube.com/watch?v=IlwCKNA0G-s", "https://www.youtube.com/watch?v=fRH0cZb3-Mg",
        "https://www.youtube.com/watch?v=dF-ZHl2VSik", "https://www.youtube.com/watch?v=UWnWxTIz54k", "https://www.youtube.com/watch?v=9SFxtqc3v08",
        "https://www.youtube.com/watch?v=eLYhnBaWOzc", "https://www.youtube.com/watch?v=txsHuXIZtxQ", "https://www.youtube.com/watch?v=YSKF1Ka-qIc",
        "https://www.youtube.com/watch?v=paSwiG4sNoU", "https://www.youtube.com/watch?v=8dVQ0813KVM", "https://www.youtube.com/watch?v=5fgtzisVDyM",
        "https://www.youtube.com/watch?v=FH8u8btNLQc", "https://www.youtube.com/watch?v=FONWSW-wdAs", "https://www.youtube.com/watch?v=JnEfBrOaxqM",
        "https://www.youtube.com/watch?v=Cw8LJoz6_7E", "https://www.youtube.com/watch?v=X5S0OjTq9kY", "https://www.youtube.com/watch?v=bKitAmHoZZU",
        "https://www.youtube.com/watch?v=8vbJ32pvr18", "https://www.youtube.com/watch?v=IyjY6gSNuso", "https://www.youtube.com/watch?v=5ZzVbodQ8BE",
        "https://www.youtube.com/watch?v=8KSzkAR5y7U", "https://www.youtube.com/watch?v=DumiHsaLyYQ", "https://www.youtube.com/watch?v=1zN6M-JxZjM",
        "https://www.youtube.com/watch?v=z4rJe-cVfOI", "https://www.youtube.com/watch?v=G8WJ6f52lKg", "https://www.youtube.com/watch?v=IfatKHskzZc",
        "https://www.youtube.com/watch?v=Czzreb0aTIA", "https://www.youtube.com/watch?v=eCaGyos-D90", "https://www.youtube.com/watch?v=xN9CmeMtSA8",
        "https://www.youtube.com/watch?v=_XVFm289U4c", "https://www.youtube.com/watch?v=zQ7xAvKlpc8", "https://www.youtube.com/watch?v=FPZi51GL3cs",
        "https://www.youtube.com/watch?v=gUeOVau_1jc", "https://www.youtube.com/watch?v=5Pspq0w178o", "https://www.youtube.com/watch?v=rYmXm6nziZs",
        "https://www.youtube.com/watch?v=ttE0j9ToOUI", "https://www.youtube.com/watch?v=vHsVJJOHxOs", "https://www.youtube.com/watch?v=8gNzjh93hLQ",
        "https://www.youtube.com/watch?v=1s1uoRwoEL8", "https://www.youtube.com/watch?v=6jYHlOQZRnI", "https://www.youtube.com/watch?v=4QLUcQTXSo4",
        "https://www.youtube.com/watch?v=yJLjLYnbg9Y", "https://www.youtube.com/watch?v=3QK1n08URqg", "https://www.youtube.com/watch?v=MlU-v3p_NIQ",
        "https://www.youtube.com/watch?v=pgRi4-k0V7g", "https://www.youtube.com/watch?v=rknFe5jvURY", "https://www.youtube.com/watch?v=mLq_P0K4jvA",
        "https://www.youtube.com/watch?v=6bRY_WIf6_s", "https://www.youtube.com/watch?v=b3frah1m2oU", "https://www.youtube.com/watch?v=WxjYBs6fQo4",
        "https://www.youtube.com/watch?v=yUKcgnchfLU", "https://www.youtube.com/watch?v=6CICHREhv-Y", "https://www.youtube.com/watch?v=zXKyjj7wGeo",
        "https://www.youtube.com/watch?v=C1k1zn1D91I", "https://www.youtube.com/watch?v=h-aonD7ZrBo", "https://www.youtube.com/watch?v=AQ2WO_u0Ork",
        "https://www.youtube.com/watch?v=3mBjn7nKrLc", "https://www.youtube.com/watch?v=vqGUetZiDAA", "https://www.youtube.com/watch?v=JVP1WGDQsLk",
        "https://www.youtube.com/watch?v=cR94CIOuAWU", "https://www.youtube.com/watch?v=vyOXAa3Lk6U", "https://www.youtube.com/watch?v=p96PxvVhbag",
        "https://www.youtube.com/watch?v=K0UOMr2DefU", "https://www.youtube.com/watch?v=Y5NBxNn_SwY", "https://www.youtube.com/watch?v=RPyLhKIFzms",
        "https://www.youtube.com/watch?v=h4Y2CsfzaOs", "https://www.youtube.com/watch?v=1hlSyMeWZQs", "https://www.youtube.com/watch?v=kxC8AxSjmqQ",
        "https://www.youtube.com/watch?v=XKi_WjVavSY", "https://www.youtube.com/watch?v=fk37wE1z9NQ", "https://www.youtube.com/watch?v=Klv76dgBcV0",
        "https://www.youtube.com/watch?v=WMWDMCZxuf4", "https://www.youtube.com/watch?v=pMFDBA2rKTI", "https://www.youtube.com/watch?v=hoYRjfrQoYo",
        "https://www.youtube.com/watch?v=7RzL1pfPRBI", "https://www.youtube.com/watch?v=8nGcWFRwhOM", "https://www.youtube.com/watch?v=rk6N_jHlH1k",
        "https://www.youtube.com/watch?v=MfrInBaQalc", "https://www.youtube.com/watch?v=KVpqwTIZL48", "https://www.youtube.com/watch?v=yaSQqDVNE3o",
        "https://www.youtube.com/watch?v=VIBO3MOHWu4", "https://www.youtube.com/watch?v=w7LIYJSfVY4", "https://www.youtube.com/watch?v=XSB3vPQRqB0",
        "https://www.youtube.com/watch?v=0nQsh_FHd3g", "https://www.youtube.com/watch?v=tmU2-z7qcuk", "https://www.youtube.com/watch?v=7R8LaMXMuAo",
        "https://www.youtube.com/watch?v=yh73ZmO1mVI", "https://www.youtube.com/watch?v=Q_4068j2b0w", "https://www.youtube.com/watch?v=5e5Z9LK-Dzw",
        "https://www.youtube.com/watch?v=7GwGu8QVpLU", "https://www.youtube.com/watch?v=CuJrvM1aDd8", "https://www.youtube.com/watch?v=m8NAlDOCG6g",
        "https://www.youtube.com/watch?v=mKh-chZynaA", "https://www.youtube.com/watch?v=88RKono6sqw", "https://www.youtube.com/watch?v=j-Zk7ndz9JA",
        "https://www.youtube.com/watch?v=dIpHgdoSndg", "https://www.youtube.com/watch?v=ahUfsSQCP3Q", "https://www.youtube.com/watch?v=RfNosnjpl9Q",
        "https://www.youtube.com/watch?v=QEJcTWnLJF4", "https://www.youtube.com/watch?v=ursltNhpNpc", "https://www.youtube.com/watch?v=Md4H8Otb_P0",
        "https://www.youtube.com/watch?v=x70N5SBhpck", "https://www.youtube.com/watch?v=u-ILeS3wH2c", "https://www.youtube.com/watch?v=NVoOf2LXhRA",
        "https://www.youtube.com/watch?v=3aATuQAMG-k", "https://www.youtube.com/watch?v=yBjBXpAleig", "https://www.youtube.com/watch?v=f7KBuTr5pK4",
        "https://www.youtube.com/watch?v=Yujn87kwveE", "https://www.youtube.com/watch?v=EAhSAmCtxxw", "https://www.youtube.com/watch?v=2TSLY10dHSY",
        "https://www.youtube.com/watch?v=LLHDHp8OhHc", "https://www.youtube.com/watch?v=WjrTKdTKz_I", "https://www.youtube.com/watch?v=oFt4yQCXqlY",
        "https://www.youtube.com/watch?v=vlsef3tCJZw", "https://www.youtube.com/watch?v=yH6Eaq_4XBg", "https://www.youtube.com/watch?v=lkf7_L6HIVM",
        "https://www.youtube.com/watch?v=cAA-XiIdIuM", "https://www.youtube.com/watch?v=tdtcm4uWVJU", "https://www.youtube.com/watch?v=dZn1AdZOdG0",
        "https://www.youtube.com/watch?v=_-k6ppRkpcM", "https://www.youtube.com/watch?v=Q6zNFmoCpZI", "https://www.youtube.com/watch?v=ennAl0PkPqk",
        "https://www.youtube.com/watch?v=Q_GwtHWVeXA", "https://www.youtube.com/watch?v=A7oywYWOtAM", "https://www.youtube.com/watch?v=auaps_ZhUlE",
        "https://www.youtube.com/watch?v=eE1ljl4nP0I", "https://www.youtube.com/watch?v=kEaZYb0WhAM", "https://www.youtube.com/watch?v=TXPw_3rtYUg",
        "https://www.youtube.com/watch?v=Ze03ILtYm60", "https://www.youtube.com/watch?v=PAYna-qXivc", "https://www.youtube.com/watch?v=EIK-YIZzk9c",
        "https://www.youtube.com/watch?v=TLq_oKIW7oo", "https://www.youtube.com/watch?v=GCZ0Cpf3yEA", "https://www.youtube.com/watch?v=rpXGB7QQcuY",
        "https://www.youtube.com/watch?v=mefAsS7L37A", "https://www.youtube.com/watch?v=HjWwM_EqilI", "https://www.youtube.com/watch?v=G8OIxHP0OJs",
        "https://www.youtube.com/watch?v=0E-lxkMHCFI", "https://www.youtube.com/watch?v=dXSZ15mzUUk", "https://www.youtube.com/watch?v=EC9pN5ev4pM",
        "https://www.youtube.com/watch?v=eyMLhrouXc4", "https://www.youtube.com/watch?v=HzdeqYwiu98", "https://www.youtube.com/watch?v=3_SjKE05TVo",
        "https://www.youtube.com/watch?v=RNXO_LI_CG0", "https://www.youtube.com/watch?v=MYY_2EZuD-E", "https://www.youtube.com/watch?v=tNOlLBHi0DU",
        "https://www.youtube.com/watch?v=hVz6owGeQX0", "https://www.youtube.com/watch?v=qqlUyQ7Jcz0", "https://www.youtube.com/watch?v=dSAGTx9Ks7o",
        "https://www.youtube.com/watch?v=9qnkyvRzOyc", "https://www.youtube.com/watch?v=o-kOE0Uev74", "https://www.youtube.com/watch?v=tJdgErAfiRQ",
        "https://www.youtube.com/watch?v=_lce4cKbjgE", "https://www.youtube.com/watch?v=LV6YR48fA0E", "https://www.youtube.com/watch?v=mK0LxwnUVpU",
        "https://www.youtube.com/watch?v=9_VrSb0i1k8", "https://www.youtube.com/watch?v=7I_q-91TMi4", "https://www.youtube.com/watch?v=vruXyAufte0",
        "https://www.youtube.com/watch?v=GJ0mO8P37Eg", "https://www.youtube.com/watch?v=vOVpY4hULsY", "https://www.youtube.com/watch?v=unLBXEyPYmg",
        "https://www.youtube.com/watch?v=PgSRjXVhx1Y", "https://www.youtube.com/watch?v=Pk_AY1ICmZs", "https://www.youtube.com/watch?v=IUFiiTpHqao",
        "https://www.youtube.com/watch?v=QFxjM-6AStA", "https://www.youtube.com/watch?v=OAD5zunh8Xc", "https://www.youtube.com/watch?v=0BZ-FceOJkQ",
        "https://www.youtube.com/watch?v=1TCN43n-pmI", "https://www.youtube.com/watch?v=CZx41MTjffk", "https://www.youtube.com/watch?v=Xh_jCFU8nrk",
        "https://www.youtube.com/watch?v=hKZDJxhrbTU", "https://www.youtube.com/watch?v=kSpA7TXIqi4", "https://www.youtube.com/watch?v=QqeoDFaC1Tc",
        "https://www.youtube.com/watch?v=_gvJ8PpSwnQ", "https://www.youtube.com/watch?v=j6nr84iyfGI", "https://www.youtube.com/watch?v=2RlTqFtdlH8",
        "https://www.youtube.com/watch?v=UONCewRGHa0", "https://www.youtube.com/watch?v=SBJewL_4xKA", "https://www.youtube.com/watch?v=oaPYZ4sUNWc",
        "https://www.youtube.com/watch?v=NvpsNokmLNs", "https://www.youtube.com/watch?v=9uThaNKuH_w", "https://www.youtube.com/watch?v=fG-BR2akh7M",
        "https://www.youtube.com/watch?v=c3r798aBCRs", "https://www.youtube.com/watch?v=sZAlHxA__8g", "https://www.youtube.com/watch?v=WS_G5Ola8U0",
        "https://www.youtube.com/watch?v=diNe_nX4WIE", "https://www.youtube.com/watch?v=HNYimdsD6nU", "https://www.youtube.com/watch?v=k-Fgwt4Yd-o",
        "https://www.youtube.com/watch?v=I1wJkaOu03g", "https://www.youtube.com/watch?v=oCij5Kx5av0", "https://www.youtube.com/watch?v=nND-WT42XtI",
        "https://www.youtube.com/watch?v=ikR1KrGr1Ho", "https://www.youtube.com/watch?v=KzfomITpXfM", "https://www.youtube.com/watch?v=RV6aLIQgmYg",
        "https://www.youtube.com/watch?v=hFritU0l6ss", "https://www.youtube.com/watch?v=lzEEazfkETM", "https://www.youtube.com/watch?v=_gSkLsdxdt8",
        "https://www.youtube.com/watch?v=PXJju0HV3V8", "https://www.youtube.com/watch?v=1bs9aLBfsIg", "https://www.youtube.com/watch?v=ShzRGi7hoBc",
        "https://www.youtube.com/watch?v=qMz92bh5G4Y", "https://www.youtube.com/watch?v=JNhv0779_do", "https://www.youtube.com/watch?v=xEdI_cakWVY",
        "https://www.youtube.com/watch?v=U7hQSrlGBp8", "https://www.youtube.com/watch?v=q10pUcFLFD0", "https://www.youtube.com/watch?v=45o9oQ_eUa8",
        "https://www.youtube.com/watch?v=a9NXI51YIf4", "https://www.youtube.com/watch?v=wqEC6iAtAU8", "https://www.youtube.com/watch?v=cR3KiQwQXRo",
        "https://www.youtube.com/watch?v=PWxRNotctD4", "https://www.youtube.com/watch?v=YU3T38sfAng", "https://www.youtube.com/watch?v=43kxtE7h4-0",
        "https://www.youtube.com/watch?v=0nUQ4NT6aKE", "https://www.youtube.com/watch?v=PkYruvDGwpM", "https://www.youtube.com/watch?v=Mod7kPl8NL0",
        "https://www.youtube.com/watch?v=IyjMLMM3Zug", "https://www.youtube.com/watch?v=FE5DAgHZ6jU", "https://www.youtube.com/watch?v=L9ZOB93qeFA",
        "https://www.youtube.com/watch?v=CCZv_itAypY", "https://www.youtube.com/watch?v=_axmm3oqSYE", "https://www.youtube.com/watch?v=fzB7g0I68FM",
        "https://www.youtube.com/watch?v=V0VHS7vQfYQ", "https://www.youtube.com/watch?v=viTGZ1zyICU", "https://www.youtube.com/watch?v=i5JxWZfFFH4",
        "https://www.youtube.com/watch?v=gcICQabQ2l0", "https://www.youtube.com/watch?v=awoMhSPq5o4", "https://www.youtube.com/watch?v=3OT3GOh-6jY",
        "https://www.youtube.com/watch?v=Ajs7yuRELAQ", "https://www.youtube.com/watch?v=nKsaeZuVChE", "https://www.youtube.com/watch?v=FSWg2OJn1Fk",
        "https://www.youtube.com/watch?v=KOCSzpBy3VM", "https://www.youtube.com/watch?v=_nwrs68FSJI", "https://www.youtube.com/watch?v=cuw96QtH_oI",
        "https://www.youtube.com/watch?v=POC6XEIL3eU", "https://www.youtube.com/watch?v=F-IJB0W7Yh0", "https://www.youtube.com/watch?v=G_7NlK38UoM",
        "https://www.youtube.com/watch?v=PftxdwWSCWw", "https://www.youtube.com/watch?v=CSTc-Cb59CU", "https://www.youtube.com/watch?v=S45sCowEYdI",
        "https://www.youtube.com/watch?v=-Fa0476cxys", "https://www.youtube.com/watch?v=Il28A-ZR2jM", "https://www.youtube.com/watch?v=KjplzHfemfk",
        "https://www.youtube.com/watch?v=hvD-4IjRzF4", "https://www.youtube.com/watch?v=ZoSYLR1tPaA", "https://www.youtube.com/watch?v=nRVEKlg2dbc",
        "https://www.youtube.com/watch?v=00igqepP8pQ", "https://www.youtube.com/watch?v=pv0T9bY6ESA", "https://www.youtube.com/watch?v=cZiz4eDtSmM",
        "https://www.youtube.com/watch?v=UaKONLQcxNY", "https://www.youtube.com/watch?v=sinPJbt1yDI", "https://www.youtube.com/watch?v=MQ4ooNYDlR0",
        "https://www.youtube.com/watch?v=lXphkAePCAg", "https://www.youtube.com/watch?v=VoV-wp--tow", "https://www.youtube.com/watch?v=kW6nAkNQRG4",
        "https://www.youtube.com/watch?v=emIhHglCmhw", "https://www.youtube.com/watch?v=oM1dCtpNh1c", "https://www.youtube.com/watch?v=Ha17gq5JQzQ",
        "https://www.youtube.com/watch?v=n0_56SmJ7d8", "https://www.youtube.com/watch?v=zy3WgCYns8c", "https://www.youtube.com/watch?v=xD8rV5Tz1UY",
        "https://www.youtube.com/watch?v=KSDWDUiFCYk", "https://www.youtube.com/watch?v=liZhbkccu08", "https://www.youtube.com/watch?v=jUENT12O88A",
        "https://www.youtube.com/watch?v=ghPxF7Blco0", "https://www.youtube.com/watch?v=kT7Q6w9ipaM", "https://www.youtube.com/watch?v=8VysHWp6miM",
        "https://www.youtube.com/watch?v=7YufZ2zZSuY", "https://www.youtube.com/watch?v=3PJTFSEALVY", "https://www.youtube.com/watch?v=EnwXieiXvYQ",
        "https://www.youtube.com/watch?v=j5dDP0oPZ6M", "https://www.youtube.com/watch?v=RRv1EhqTlvE", "https://www.youtube.com/watch?v=Q6k6k4w2BTA",
        "https://www.youtube.com/watch?v=rwoWt8L8msE", "https://www.youtube.com/watch?v=TiL1wHZ2nkA", "https://www.youtube.com/watch?v=R0-XVd3AJfc",
        "https://www.youtube.com/watch?v=1601kxcLVQc", "https://www.youtube.com/watch?v=D6tjrfVXpvM", "https://www.youtube.com/watch?v=bKUdPGNtnGE",
        "https://www.youtube.com/watch?v=4zMZ6TLOKQo", "https://www.youtube.com/watch?v=czU5C3qKlls", "https://www.youtube.com/watch?v=N20NvtWu1Xg",
        "https://www.youtube.com/watch?v=IFpCxvITk14", "https://www.youtube.com/watch?v=IInoCnHycrg", "https://www.youtube.com/watch?v=Oy9pWx3_0bw",
        "https://www.youtube.com/watch?v=evADAC669CE", "https://www.youtube.com/watch?v=eRWrZq52OGc", "https://www.youtube.com/watch?v=AttvYYAmHJk",
        "https://www.youtube.com/watch?v=SEe4aFVZK9Y", "https://www.youtube.com/watch?v=6hraJGzeD40", "https://www.youtube.com/watch?v=VbL7ENfHVS4",
        "https://www.youtube.com/watch?v=mHOchoMgZ3c", "https://www.youtube.com/watch?v=cwCp8_IIE7I", "https://www.youtube.com/watch?v=6huaWQByXiA",
        "https://www.youtube.com/watch?v=wD_ZDfN1of0", "https://www.youtube.com/watch?v=j-YPjz_0Kwg", "https://www.youtube.com/watch?v=IEdenoqwjIE",
        "https://www.youtube.com/watch?v=iIv8qBcuIjc", "https://www.youtube.com/watch?v=2nUnJJ7Qv3Y", "https://www.youtube.com/watch?v=liQQPU6JLCA",
        "https://www.youtube.com/watch?v=qONR4lY0t-Y", "https://www.youtube.com/watch?v=s1XmZ3VwCBk", "https://www.youtube.com/watch?v=NzIa8hIppyc",
        "https://www.youtube.com/watch?v=eIW7KCxtnA4", "https://www.youtube.com/watch?v=_JAEie45zsg", "https://www.youtube.com/watch?v=l_RSwj_k6TU",
        "https://www.youtube.com/watch?v=yupX-zU9HHc", "https://www.youtube.com/watch?v=fqNdR1BBkpw", "https://www.youtube.com/watch?v=yJnavzEq--o",
        "https://www.youtube.com/watch?v=c1XMoX4xK9I", "https://www.youtube.com/watch?v=CL9sa0L5LS8", "https://www.youtube.com/watch?v=Yh1_bohHyDM",
        "https://www.youtube.com/watch?v=g-aktBVzmFw", "https://www.youtube.com/watch?v=bqAYkoWMs9o", "https://www.youtube.com/watch?v=CVzM_jOTLIo",
        "https://www.youtube.com/watch?v=g_C-90Kta6I", "https://www.youtube.com/watch?v=RYs9IqeWOzg", "https://www.youtube.com/watch?v=ueoqmwTAcNM",
        "https://www.youtube.com/watch?v=QlGXRqcF7V4", "https://www.youtube.com/watch?v=gBbkvzXdzSE", "https://www.youtube.com/watch?v=QzpQnmR2-Yk",
        "https://www.youtube.com/watch?v=L78C8By9pwg", "https://www.youtube.com/watch?v=nzeYP0ULZS0", "https://www.youtube.com/watch?v=1ETGs0lAUcM",
        "https://www.youtube.com/watch?v=CfkUQyXDSbE", "https://www.youtube.com/watch?v=C4VplYgaGqc", "https://www.youtube.com/watch?v=Pwf3o2igZ1M",
        "https://www.youtube.com/watch?v=6R8cXxvCaDk", "https://www.youtube.com/watch?v=xt2OdUfYZbk", "https://www.youtube.com/watch?v=4bxe2OoBaC4",
        "https://www.youtube.com/watch?v=9kJ5YNkRQuE", "https://www.youtube.com/watch?v=RYk3JkjrUwI", "https://www.youtube.com/watch?v=Q_11XmQCCaE",
        "https://www.youtube.com/watch?v=jM0GePXOdT0", "https://www.youtube.com/watch?v=QSqIG5Dl-SM", "https://www.youtube.com/watch?v=-aq4Bu4Oj6k",
        "https://www.youtube.com/watch?v=h_0oGdbNoOY", "https://www.youtube.com/watch?v=7F37Pg33LXU", "https://www.youtube.com/watch?v=v9kPivayYQ8",
        "https://www.youtube.com/watch?v=mOOeR4UCJyw", "https://www.youtube.com/watch?v=sxMgFSMZbbo", "https://www.youtube.com/watch?v=nK8ADR-Ms_U",
        "https://www.youtube.com/watch?v=-kJ-13T26kM", "https://www.youtube.com/watch?v=pnrBDXoYsg4", "https://www.youtube.com/watch?v=OpF3vSVsNf8",
        "https://www.youtube.com/watch?v=T44ccJQvlx8", "https://www.youtube.com/watch?v=pbj-gzf9OeA", "https://www.youtube.com/watch?v=7QAaERY5nas",
        "https://www.youtube.com/watch?v=0xkLnFJ_UNs", "https://www.youtube.com/watch?v=wFlS6nHskN4", "https://www.youtube.com/watch?v=OyJoQRHslRY",
        "https://www.youtube.com/watch?v=rv9jh25utxk", "https://www.youtube.com/watch?v=aygKqz2ldTU", "https://www.youtube.com/watch?v=mP6mglRlG_Q",
        "https://www.youtube.com/watch?v=S3IdLBelqmY", "https://www.youtube.com/watch?v=kEQmNOl3wek", "https://www.youtube.com/watch?v=Qn2WannusmE",
        "https://www.youtube.com/watch?v=5fdtDCpRdj4", "https://www.youtube.com/watch?v=5GR8ieD5N1g", "https://www.youtube.com/watch?v=NLHmcHPNyT0",
        "https://www.youtube.com/watch?v=adJQgyXcMo8", "https://www.youtube.com/watch?v=pUB_QptuSms", "https://www.youtube.com/watch?v=bC3BGMsn5ag",
        "https://www.youtube.com/watch?v=H45Aki9udK4", "https://www.youtube.com/watch?v=lga-296vQxI", "https://www.youtube.com/watch?v=iVYiasaSQOU",
        "https://www.youtube.com/watch?v=xNZvpni13To", "https://www.youtube.com/watch?v=wcPNAFTDsdU", "https://www.youtube.com/watch?v=XGoSmAfWYvQ",
        "https://www.youtube.com/watch?v=ybERimJ2eUk", "https://www.youtube.com/watch?v=_lbFEFh4eLc", "https://www.youtube.com/watch?v=QjkbNJJFBzU",
        "https://www.youtube.com/watch?v=H9UE7xIP_AA", "https://www.youtube.com/watch?v=OE2NPmqZ9nM", "https://www.youtube.com/watch?v=hZzIH0PPX8g",
        "https://www.youtube.com/watch?v=c3dpwI95RVU", "https://www.youtube.com/watch?v=BP9uI4rFVHU", "https://www.youtube.com/watch?v=dDMKw6VEJOc",
        "https://www.youtube.com/watch?v=PpMAd7uXMSY", "https://www.youtube.com/watch?v=C8FnumrX67Q", "https://www.youtube.com/watch?v=x70N5SBhp3E",
        "https://www.youtube.com/watch?v=gkcVDH5mbnc", "https://www.youtube.com/watch?v=YNjdY6qVqAs", "https://www.youtube.com/watch?v=s7H3daOeVYk",
        "https://www.youtube.com/watch?v=BuBniSk_d1I", "https://www.youtube.com/watch?v=bgb1wov575U", "https://www.youtube.com/watch?v=wGnHBo5bKiU",
        "https://www.youtube.com/watch?v=3E4xAlzt8m8", "https://www.youtube.com/watch?v=e9mAhK538gA", "https://www.youtube.com/watch?v=DIxTcR3Xjt0",
        "https://www.youtube.com/watch?v=bvYwcDAdBg0", "https://www.youtube.com/watch?v=m-oJvkEZbmg", "https://www.youtube.com/watch?v=RcPprJXfiyU",
        "https://www.youtube.com/watch?v=--keubHnjlc", "https://www.youtube.com/watch?v=1eNIN0pOm2U", "https://www.youtube.com/watch?v=jy7dVEc-j7g",
        "https://www.youtube.com/watch?v=xrJcUWOI80g", "https://www.youtube.com/watch?v=JmzL5aDcPvE", "https://www.youtube.com/watch?v=9mhJwERrtqc",
        "https://www.youtube.com/watch?v=Cz9c1PklGAI", "https://www.youtube.com/watch?v=nPMoA0S-kpU", "https://www.youtube.com/watch?v=jZAiZjUR9Dg",
        "https://www.youtube.com/watch?v=UoDVbhHTEwo", "https://www.youtube.com/watch?v=kEJco49Etbo", "https://www.youtube.com/watch?v=Zn-QGw8v62E",
        "https://www.youtube.com/watch?v=MarLyJlSkrE", "https://www.youtube.com/watch?v=1nN0pRaVdlA", "https://www.youtube.com/watch?v=zwLoDSUn9hA",
        "https://www.youtube.com/watch?v=TQMdqwtaieg", "https://www.youtube.com/watch?v=p0JrNTGUvu8", "https://www.youtube.com/watch?v=50-XWgC99IE",
        "https://www.youtube.com/watch?v=TXwEra6XPrw", "https://www.youtube.com/watch?v=ocwZ3A4BZO4", "https://www.youtube.com/watch?v=VxrXSdBjej4",
        "https://www.youtube.com/watch?v=AbO8lZWPz4g", "https://www.youtube.com/watch?v=YyXs4qfZV_U", "https://www.youtube.com/watch?v=PxI_yua629M",
        "https://www.youtube.com/watch?v=Glla2ttWEJc", "https://www.youtube.com/watch?v=Ad57xYylcps", "https://www.youtube.com/watch?v=ZKee-DNVfWY",
        "https://www.youtube.com/watch?v=Pv_o_K9Hgc0", "https://www.youtube.com/watch?v=0Dg0C1UVVgQ", "https://www.youtube.com/watch?v=nKCO--hr_pw",
        "https://www.youtube.com/watch?v=McCpCXmpz2U", "https://www.youtube.com/watch?v=PMdbuqOXatA", "https://www.youtube.com/watch?v=eapk1fdy0Ek",
        "https://www.youtube.com/watch?v=9yfHbk1N9Bo", "https://www.youtube.com/watch?v=4cwYtMOVT0c", "https://www.youtube.com/watch?v=WVWxZ3MjjL4",
        "https://www.youtube.com/watch?v=Sny9PALti8o", "https://www.youtube.com/watch?v=4alSontsrp8", "https://www.youtube.com/watch?v=yZeoumimeF0",
        "https://www.youtube.com/watch?v=7AVxv7IOYWA", "https://www.youtube.com/watch?v=p3g-sy2OsMA", "https://www.youtube.com/watch?v=LQucWNCL71c",
        "https://www.youtube.com/watch?v=uAAaCgJMaNg", "https://www.youtube.com/watch?v=pYcpZJVmXvU", "https://www.youtube.com/watch?v=H7G1yjDfwL4",
        "https://www.youtube.com/watch?v=dK2rxOVcH38", "https://www.youtube.com/watch?v=cJxDREJVpPc", "https://www.youtube.com/watch?v=GAW8CworBRg",
        "https://www.youtube.com/watch?v=O8MtMb2RkKg", "https://www.youtube.com/watch?v=Z5QIy3Zo3c8", "https://www.youtube.com/watch?v=dvX3Le4GvDw",
        "https://www.youtube.com/watch?v=4dZmCfO-8OU", "https://www.youtube.com/watch?v=vhqsLLlkNls", "https://www.youtube.com/watch?v=J3TCxKaG_wk",
        "https://www.youtube.com/watch?v=kEOZhqGRA6M", "https://www.youtube.com/watch?v=OdtcUgDb53Q", "https://www.youtube.com/watch?v=EDbSi5cN63U",
        "https://www.youtube.com/watch?v=eKMK0f-9n80", "https://www.youtube.com/watch?v=7nStwe4asuY"
    ];
    const youtubeVideoIDs = youtubeVideoURLs.map(url => {
        try {
            const urlObj = new URL(url);
            const videoId = urlObj.searchParams.get("v");
            if (!videoId) {
                console.error(`Could not extract video ID from URL: ${url}. Invalid format.`);
                return null;
            }
            return videoId;
        } catch (error) {
            console.error(`Error parsing URL: ${url}`, error);
            return null;
        }
    }).filter(id => id !== null); // Filter out any nulls from parsing errors

    let youtubeMemes = [];

    // Functions for YouTube Meme Cavern
    function displayYoutubeMeme(videoId) {
        const container = document.getElementById('youtubeLinksContainer');
        if (container && videoId) {
            const memeDiv = document.createElement('div');
            memeDiv.className = 'memeDiv'; // For styling & structure

            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}`;
            iframe.width = "560"; // Standard 16:9, can be styled with CSS later
            iframe.height = "315";
            iframe.frameBorder = "0";
            iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
            iframe.allowFullscreen = true;

            memeDiv.appendChild(iframe);
            container.appendChild(memeDiv);
        }
    }

    function updateMemeCavern() {
        const container = document.getElementById('youtubeLinksContainer');
        if (!container) {
            console.error('Meme Cavern container not found!');
            return;
        }
        container.innerHTML = ''; // Clear previous memes to prevent duplication

        // Determine how many memes to show based on playerLevel
        const memesToShow = Math.min(playerLevel + 5, youtubeVideoIDs.length);

        for (let i = 0; i < memesToShow; i++) {
            if (youtubeVideoIDs[i]) {
                displayYoutubeMeme(youtubeVideoIDs[i]);
            }
        }
    }

    // Event listener for Meme Cavern Tab
    const memeCavernTabButton = document.querySelector('.tab-link[onclick*="memeCavernTab"]');
    if (memeCavernTabButton) {
        memeCavernTabButton.addEventListener('click', () => {
            updateMemeCavern();
        });
    } else {
        console.error('Meme Cavern tab button not found for event listener.');
    }

    // Game State Variables
    let qp = 0;
    let qpPerClick = 1;
    let qpPerSecond = 0;
    let goldenFeathers = 0;
    let totalQPAllTime = 0;
    let playerLevel = 0;
    const levelQPThresholds = [ // Adjusted
        0,    // Start
        1e9,  // Lvl 1 (1 Billion)
        1e13, // Lvl 2 (10 Trillion)
        1e17, // Lvl 3 (100 Quadrillion)
        1e22, // Lvl 4
        1e27, // Lvl 5
        1e33, // Lvl 6 (was 1e39)
        1e39, // Lvl 7 (was 1e45)
        1e46, // Lvl 8 (was 1e52)
        1e54, // Lvl 9 (was 1e60)
        1e63, // Lvl 10 (was 1e69) - Vigintillion
        1e72, // Lvl 11 (was 1e79)
        1e81, // Lvl 12 (was 1e90)
        1e91, // Lvl 13 (was 1e102)
        1e102,// Lvl 14 (was 1e115)
        1e114,// Lvl 15 (was 1e129)
        1e127,// Lvl 16 (was 1e144)
        1e141,// Lvl 17 (was 1e160)
        1e156,// Lvl 18 (was 1e177)
        1e172,// Lvl 19 (was 1e195)
        1e189 // Lvl 20 (was 1e214)
        // Extended further in previous step, ensure consistency or re-evaluate fully if needed
        // For now, these are the first 20. If more were added up to 30, they'd need to be here.
        // Let's assume the previous extension to 30 is what we want to keep, with these initial adjustments.
        // Re-adding the L21-30 from previous with slight adjustments for smoother curve if possible
        // 1e189, // L20
        // 1e208, // L21 (was 1e234)
        // 1e228, // L22 (was 1e255)
        // 1e249, // L23 (was 1e277)
        // 1e271, // L24 (was 1e300)
        // 1e294, // L25 (was 1e324)
        // // Numbers beyond e308 are problematic for JS native number type, though formatNumber handles display.
        // // Calculations might suffer.
        // 1e318, // L26 (was 1e350)
        // 1e343, // L27 (was 1e377)
        // 1e370, // L28 (was 1e405)
        // 1e398, // L29 (was 1e434)
        // 1e427  // L30 (was 1e464)
    ];
    // Re-evaluating level thresholds based on previous step's full set, with initial adjustments
     const finalLevelQPThresholds = [
        // Levels 0-30 (from existing)
        0,    1e9,   1e13,  1e17,  1e22,  1e27,
        1e33, 1e39,
