/* eslint-disable */

import { Networks, Web3Errors } from '../../util/constants/web3'
import registerWeb3 from '../../util/web3/registerWeb3'
import pollWeb3 from '../../util/web3/pollWeb3'
import getContract from '../../util/web3/getContract'

const state = {
  instance: null,
  network: null,
  account: null,
  error: Web3Errors.None,
  contractInstance: null,
}

const getters = {
}

const actions = {
  registerWeb3({ commit, dispatch }, router) {
    console.log('registerWeb3 action being executed')

    registerWeb3().then((result) => {
      commit('registerWeb3Instance', { result, router })

      dispatch('getContract', result.web3())
    }).catch((error) => {
      commit('setWeb3Error', { message: 'Unable to register web3', error })
    })
  },
  pollWeb3({ commit }, payload) {
    console.log('pollWeb3 action being executed')
    commit('pollWeb3Instance', payload)
  },
  getContract({ commit }, web3) {
    console.log('getContract action being executed')

    getContract(web3).then((result) => {
      commit('getContractInstance', result)
    }).catch((e) => {
      commit('setWeb3Error', { message: 'Unable to register the contract', error })
    })
  },
}

const mutations = {
  registerWeb3Instance(currentState, payload) {
    const { result, router } = payload
    console.log('registerWeb3instance mutation being executed', result)

    currentState.network = Networks[result.networkId]
    currentState.instance = result.web3

    if (!result.accounts.length) {
      currentState.error = Web3Errors.Locked
    } else {
      currentState.account = result.accounts[0]
      currentState.error = Web3Errors.None
    }

    pollWeb3(router)
  },

  pollWeb3Instance(currentState, payload) {
    console.log('pollWeb3Instance mutation being executed', payload)

    // NOTE: We don't change the network here because changing the network
    //  in MetaMask triggers a full page reload so registerWeb3Instance will
    //  fire again.

    currentState.error = Web3Errors.None
    currentState.account = payload.account
  },

  getContractInstance(currentState, payload) {
    console.log('getContractInstance mutation being executed', payload)
    currentState.contractInstance = () => {
      return payload
    }
  },

  setWeb3Error(currentState, payload) {
    const { message, error } = payload

    console.log(message, error)

    currentState.error = error
    currentState.account = null
  },
}

export { Web3Errors }

export default {
  state,
  getters,
  actions,
  mutations,
}
