import { defineStore } from 'pinia'

type BillingCycle = 'monthly' | 'yearly'

interface PersonalInfo {
  username: string
  phone: string
  nationality: string
  password?: string
  confirmPassword?: string
}

interface OrgInfo {
  name: string
  location: string
}

interface RegistrationState {
  personal: PersonalInfo | null
  org: OrgInfo | null
  selectedPackage: string | null
  billingCycle: BillingCycle
}

export const useRegistrationStore = defineStore('registration', {
  state: (): RegistrationState => ({
    personal: null,
    org: null,
    selectedPackage: null,
    billingCycle: 'monthly',
  }),
  actions: {
    setRegistration(payload: {
      personal: PersonalInfo
      org: OrgInfo
      selectedPackage: string
      billingCycle: BillingCycle
    }) {
      this.personal = payload.personal
      this.org = payload.org
      this.selectedPackage = payload.selectedPackage
      this.billingCycle = payload.billingCycle
    },
    reset() {
      this.personal = null
      this.org = null
      this.selectedPackage = null
      this.billingCycle = 'monthly'
    },
  },
})

