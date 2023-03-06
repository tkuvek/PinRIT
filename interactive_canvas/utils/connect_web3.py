from web3 import Web3
import json
import base64
from os import getcwd
from collections import OrderedDict
import collections

CONTRACT_ABI = ''
alchemy_url = 'https://polygon-mumbai.g.alchemy.com/v2/CeMUark81xzX_GxKXhLXzHoy1ZYRfMu-'

def connect_contract():
    w3 = Web3(Web3.HTTPProvider(alchemy_url))
    if w3.isConnected():
        f = open(getcwd()+'/utils/contract_abi.json')
        CONTRACT_ABI = json.load(f).get('abi')
        # prev contract: 0x621eB9d5A29306ea50dE3dE7bbbac53F2B4e489a
        # connect to contract
        contract = w3.eth.contract(address='0x54f2dd7c40c5012163F4423f7A84f13e1a14F30a', abi=CONTRACT_ABI)
        return contract
    else:
        return False

# def get_data(contract, max_id):
#     minted_pixels = {}
#     for i in range(1, max_id+1):
#         token_color = contract.functions.tokenIdToColor(i).call()
#         minted_pixels[i] = token_color
    
#     ordered_data = collections.OrderedDict(sorted(minted_pixels.items()))
#     return ordered_data


# connect web3
def get_data(contract, i):
    minted_pixels = {}
    #get token uri
    # try:
    # for i in range(30):
    i=int(i)
        # token_uri = contract.functions.tokenURI(i).call()

        #get token color
    token_color = contract.functions.tokenIdToColor(i).call()
    # print(token_color)
    minted_pixels[i] = token_color
            # print(minted_pixels)

            # converting token_uri
            # token_uri = token_uri.replace('data:application/json;base64,', '')
            # token_uri = token_uri.encode()

            # img_json = json.loads(base64.b64decode(token_uri))
            # img = img_json.get('image')
            # img = img.replace('data:image/svg+xml;base64,', '')
            # img = base64.b64decode(img).decode()
            # print(img)

            # save as svg --testing only
            # new_img = open(getcwd()+'/utils/temp.svg', 'w+')
            # new_img.write(img)
            # new_img.close()

    # except Exception:
    return minted_pixels

    # # Print if web3 is successfully connected
    # print(w3.isConnected())

    # # Get the latest block number
    # latest_block = w3.eth.block_number
    # print(latest_block)

    # # Get the balance of an account
    # balance = w3.eth.get_balance('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')
    # print(balance)

    # # Get the information of a transaction
    # tx = w3.eth.get_transaction('0x5c504ed432cb51138bcf09aa5e8a410dd4a1e204ef84bfed1be16dfba1b22060')
