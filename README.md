# PinRIT PoC

## Blockchain testing on blockchain branch
1. Potreban account na <a href="https://www.alchemy.com/">https://www.alchemy.com/</a> (može preko Google Sign In).
2. Unutar Alchemyja: Apps > Create app > Chain = Polygon > Network = Polygon Mumbai (+dodati nekakvo ime)
3. Nakon što je app kreiran potrebno ga je otvoriti i kliknuti button "VIEW KEY". Kopirate HTTPS key i zaljepiti ga u .env, u polje TESTNET_RPC.
4. Instalirati MetaMask ekstenziju u browser i povezati se na Polygon Mumbai mrežu. (button na dnu <a href="https://mumbai.polygonscan.com/">https://mumbai.polygonscan.com/</a>)
5. Kopirati svoj MetaMask wallet address i pasteati ga u faucet stranicu: <a href="https://mumbaifaucet.com/">https://mumbaifaucet.com/</a>, gdje će se dobiti testni MATIC
6. Ući u MetaMask browser ekstenziju stisntui tri točkice te zatim Account details. Exportati Private Key te ga kopirati u .env polje PRIVATE_KEY
7. Također je potreno kreirati account na <a href="https://mumbai.polygonscan.com/">https://mumbai.polygonscan.com/</a> da bi dobili API key za komunikaciju. Nakon što je account napravljen hoverati ime i stisnuti API keys te zatim dodati novi API key. Kopirati ga i pasteati u .env polje POLYGONSCAN_API_KEY

8. `npm install`
9. `npx hardhat compile`
10. `npx hardhat run scripts/deploy.js --network mumbai`
11. `npx hardhat verify --network mumbai <0x... od prijašnje komande>`


## Interactive pixels
Starter app za pinRIT projekt.
1. Potreban python3.7+
2. Aktivirati virtualku > `pip install virtualenv` *ako vec nema globalno
    1. `python -m venv .venv`
    2. UNIX: `source .venv/bin/activate`
    2. Windows: `.venv/Scripts/activate`
    3. `pip install -r REQUIREMENTS.txt`

3. Pokrenuti app koristeci > `python app.py`
