from web3 import Web3
import json
import base64
from os import getcwd

CONTRACT_ABI = ''
alchemy_url = 'https://polygon-mumbai.g.alchemy.com/v2/CeMUark81xzX_GxKXhLXzHoy1ZYRfMu-'

def connect_contract():
    w3 = Web3(Web3.HTTPProvider(alchemy_url))
    if w3.isConnected():
        f = open(getcwd()+'/utils/contract_abi.json')
        CONTRACT_ABI = json.load(f).get('abi')
        # connect to contract
        contract = w3.eth.contract(address='0x53734b36FE7E9f35FD15c7BE1ccA054E9bFaEb3E', abi=CONTRACT_ABI)
        return contract
    else:
        return False

#connect web3
def get_data(contract, i):
    minted_pixels = {}
    i=int(i)
    token_uri = contract.functions.tokenURI(i).call()
    token_uri = token_uri.replace('data:application/json;base64,', '')
    token_uri = token_uri.encode()
    img_json = json.loads(base64.b64decode(token_uri))
    img = img_json.get('image')

    minted_pixels[i] = img

    return minted_pixels
