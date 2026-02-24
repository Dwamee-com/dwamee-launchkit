<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'

import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import { useRegistrationStore } from '@/stores/registration'
import {
  Check,
  User,
  Building2,
  CreditCard,
  ArrowRight,
  ArrowLeft,
  Shield,
  Sparkles,
} from 'lucide-vue-next'

const router = useRouter()
const registrationStore = useRegistrationStore()

const nationalities = [
  'Egyptian',
  'Saudi',
  'Emirati',
  'Kuwaiti',
  'Qatari',
  'Bahraini',
  'Omani',
  'Jordanian',
  'Lebanese',
  'Iraqi',
  'Moroccan',
  'Tunisian',
  'Algerian',
  'American',
  'British',
  'Canadian',
  'German',
  'French',
  'Indian',
  'Other',
]

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    monthlyPrice: 0,
    yearlyPrice: 0,
    employees: 10,
    costPerEmployee: 'Free',
    popular: false,
    features: ['Up to 10 employees', 'Basic attendance', '1 branch', 'Email support'],
  },
  {
    id: 'professional',
    name: 'Professional',
    monthlyPrice: 49,
    yearlyPrice: 39,
    employees: 50,
    costPerEmployee: '~150 EGP',
    popular: true,
    features: [
      'Up to 50 employees',
      'Full attendance + payroll',
      '5 branches',
      'Priority support',
      'Geofencing',
    ],
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    monthlyPrice: 149,
    yearlyPrice: 119,
    employees: 500,
    costPerEmployee: '~100 EGP',
    popular: false,
    features: [
      'Up to 500 employees',
      'Everything in Pro',
      'Unlimited branches',
      'Dedicated support',
      'Custom integrations',
      'API access',
    ],
  },
]

const steps = [
  { id: 1, title: 'Personal Info', icon: User },
  { id: 2, title: 'Organization', icon: Building2 },
  { id: 3, title: 'Package', icon: CreditCard },
]

const step = ref(1)
const personal = ref({
  username: '',
  phone: '',
  nationality: '',
  password: '',
  confirmPassword: '',
})

const org = ref({
  name: '',
  location: '',
})

const selectedPackage = ref('starter')
const billingCycle = ref<'monthly' | 'yearly'>('monthly')

const nextStep = () => {
  step.value = Math.min(step.value + 1, 3)
}

const prevStep = () => {
  step.value = Math.max(step.value - 1, 1)
}

const handleSubmit = () => {
  registrationStore.setRegistration({
    personal: personal.value,
    org: org.value,
    selectedPackage: selectedPackage.value,
    billingCycle: billingCycle.value,
  })
  router.push('/checkout')
}

const monthlySelected = computed(() => billingCycle.value === 'monthly')
const yearlySelected = computed(() => billingCycle.value === 'yearly')
</script>

<template>
  <div class="min-h-screen bg-background relative overflow-hidden">
    <div
      class="absolute inset-0 opacity-[0.025]"
      :style="{
        backgroundImage: `
            linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
          `,
        backgroundSize: '44px 44px',
      }"
    />

    <motion.div
      v-for="shape in [
        { delay: 0, x: '5%', y: '10%', size: 55, rotate: 12 },
        { delay: 1.5, x: '85%', y: '8%', size: 40, rotate: -8 },
        { delay: 0.8, x: '90%', y: '55%', size: 50, rotate: 20 },
        { delay: 2, x: '8%', y: '70%', size: 45, rotate: -15 },
        { delay: 1.2, x: '75%', y: '80%', size: 35, rotate: 30 },
        { delay: 0.5, x: '50%', y: '5%', size: 42, rotate: -25 },
      ]"
      :key="`${shape.x}-${shape.y}`"
      class="absolute border border-primary/10 rounded-lg"
      :style="{
        left: shape.x,
        top: shape.y,
        width: `${shape.size}px`,
        height: `${shape.size}px`,
      }"
      :initial="{ opacity: 0 }"
      :animate="{
        opacity: [0.1, 0.25, 0.1],
        rotate: [shape.rotate, shape.rotate + 90, shape.rotate],
        y: [0, -15, 0],
      }"
      :transition="{
        duration: 8,
        delay: shape.delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }"
    />

    <div
      v-for="classes in ['top-6 left-6', 'top-6 right-6', 'bottom-6 left-6', 'bottom-6 right-6']"
      :key="classes"
      :class="['absolute grid grid-cols-3 gap-2', classes]"
    >
      <motion.div
        v-for="i in 9"
        :key="i"
        class="w-1.5 h-1.5 rounded-full bg-primary/15"
        :animate="{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }"
        :transition="{
          duration: 3,
          delay: (i - 1) * 0.15,
          repeat: Infinity,
        }"
      />
    </div>

    <motion.div
      class="absolute top-[18%] right-[15%]"
      :animate="{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }"
      :transition="{ duration: 6, repeat: Infinity }"
    >
      <Sparkles class="w-5 h-5 text-primary/20" />
    </motion.div>
    <motion.div
      class="absolute bottom-[28%] left-[12%]"
      :animate="{ rotate: [0, -180, -360], scale: [1, 0.7, 1] }"
      :transition="{ duration: 7, delay: 1, repeat: Infinity }"
    >
      <Sparkles class="w-4 h-4 text-primary/15" />
    </motion.div>

    <div
      class="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-10"
    >
      <motion.div
        :initial="{ y: -20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        class="mb-8 text-center"
      >
        <h1 class="text-3xl font-bold text-primary">
          Dwamee
        </h1>
        <p class="text-muted-foreground text-sm mt-1">
          Create your account
        </p>
      </motion.div>

      <motion.div
        :initial="{ y: -10, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        :transition="{ delay: 0.1 }"
        class="flex items-center gap-0 mb-10 w-full max-w-md justify-center"
      >
        <div
          v-for="(s, idx) in steps"
          :key="s.id"
          class="flex items-center"
        >
          <div class="flex flex-col items-center gap-1.5">
            <motion.div
              :animate="step === s.id ? { scale: [1, 1.1, 1] } : {}"
              :transition="{ duration: 1.5, repeat: Infinity }"
              :class="[
                'w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300',
                step > s.id
                  ? 'bg-primary text-primary-foreground'
                  : step === s.id
                    ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                    : 'bg-muted text-muted-foreground',
              ]"
            >
              <Check
                v-if="step > s.id"
                class="w-5 h-5"
              />
              <component
                :is="s.icon"
                v-else
                class="w-5 h-5"
              />
            </motion.div>
            <span
              :class="[
                'text-xs font-medium transition-colors',
                step >= s.id ? 'text-primary' : 'text-muted-foreground',
              ]"
            >
              {{ s.title }}
            </span>
          </div>
          <div
            v-if="idx < steps.length - 1"
            :class="[
              'w-16 sm:w-24 h-0.5 mx-2 mb-5 rounded-full transition-colors duration-300',
              step > s.id ? 'bg-primary' : 'bg-muted',
            ]"
          />
        </div>
      </motion.div>

      <div class="w-full max-w-lg">
        <Card class="border-border shadow-lg relative overflow-hidden">
          <div class="absolute top-3 right-3 grid grid-cols-2 gap-1">
            <motion.div
              v-for="i in 4"
              :key="i"
              class="w-1 h-1 rounded-full bg-primary/20"
              :animate="{ opacity: [0.3, 0.7, 0.3] }"
              :transition="{ duration: 2, delay: (i - 1) * 0.2, repeat: Infinity }"
            />
          </div>

          <CardContent class="p-6 sm:p-8">
            <div v-if="step === 1">
              <motion.div
                key="step1"
                :initial="{ opacity: 0, x: 30 }"
                :animate="{ opacity: 1, x: 0 }"
                class="space-y-4"
              >
                <div>
                  <h2 class="text-xl font-bold text-foreground mb-1">
                    Personal Information
                  </h2>
                  <p class="text-muted-foreground text-sm mb-6">
                    Enter your details to get started
                  </p>
                </div>
                <div class="space-y-4">
                  <div>
                    <Label for="username">
                      Username
                    </Label>
                    <Input
                      id="username"
                      v-model="personal.username"
                      placeholder="Enter your username"
                      class="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label for="phone">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      v-model="personal.phone"
                      placeholder="+20 1XX XXX XXXX"
                      class="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label>
                      Nationality
                    </Label>
                    <select
                      v-model="personal.nationality"
                      class="mt-1.5 flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="" disabled>
                        Select nationality
                      </option>
                      <option
                        v-for="n in nationalities"
                        :key="n"
                        :value="n"
                      >
                        {{ n }}
                      </option>
                    </select>
                  </div>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <Label for="password">
                        Password
                      </Label>
                      <Input
                        id="password"
                        v-model="personal.password"
                        type="password"
                        placeholder="••••••••"
                        class="mt-1.5"
                      />
                    </div>
                    <div>
                      <Label for="confirmPassword">
                        Confirm
                      </Label>
                      <Input
                        id="confirmPassword"
                        v-model="personal.confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        class="mt-1.5"
                      />
                    </div>
                  </div>
                </div>
                <Button class="w-full mt-6 btn-primary" @click="nextStep">
                  Continue
                  <ArrowRight class="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            </div>

            <div v-else-if="step === 2">
              <motion.div
                key="step2"
                :initial="{ opacity: 0, x: 30 }"
                :animate="{ opacity: 1, x: 0 }"
                class="space-y-4"
              >
                <div>
                  <h2 class="text-xl font-bold text-foreground mb-1">
                    Organization Details
                  </h2>
                  <p class="text-muted-foreground text-sm mb-6">
                    Tell us about your company
                  </p>
                </div>
                <div class="space-y-4">
                  <div>
                    <Label for="orgName">
                      Organization Name
                    </Label>
                    <Input
                      id="orgName"
                      v-model="org.name"
                      placeholder="Your company name"
                      class="mt-1.5"
                    />
                  </div>
                  <div>
                    <Label for="orgLocation">
                      Location
                    </Label>
                    <Input
                      id="orgLocation"
                      v-model="org.location"
                      placeholder="City, Country"
                      class="mt-1.5"
                    />
                  </div>
                </div>
                <div class="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    class="flex-1"
                    @click="prevStep"
                  >
                    <ArrowLeft class="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    class="flex-1 btn-primary"
                    @click="nextStep"
                  >
                    Continue
                    <ArrowRight class="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </div>

            <div v-else>
              <motion.div
                key="step3"
                :initial="{ opacity: 0, x: 30 }"
                :animate="{ opacity: 1, x: 0 }"
              >
                <h2 class="text-xl font-bold text-foreground mb-1">
                  Choose Your Plan
                </h2>
                <p class="text-muted-foreground text-sm mb-3">
                  All plans include a 7-day free trial
                </p>

                <div
                  class="flex items-center justify-center gap-1 mb-4 bg-muted rounded-full p-1 max-w-xs mx-auto"
                >
                  <button
                    type="button"
                    :class="[
                      'flex-1 text-sm font-medium py-2 px-4 rounded-full transition-all',
                      monthlySelected
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground',
                    ]"
                    @click="billingCycle = 'monthly'"
                  >
                    Monthly
                  </button>
                  <button
                    type="button"
                    :class="[
                      'flex-1 text-sm font-medium py-2 px-4 rounded-full transition-all relative',
                      yearlySelected
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:text-foreground',
                    ]"
                    @click="billingCycle = 'yearly'"
                  >
                    Yearly
                    <span
                      class="absolute -top-2 -right-2 text-[9px] bg-accent text-accent-foreground px-1.5 py-0.5 rounded-full font-bold"
                    >
                      -20%
                    </span>
                  </button>
                </div>

                <div
                  class="flex items-center gap-2 mb-4 rounded-lg bg-accent/10 p-2.5"
                >
                  <Shield class="w-4 h-4 text-accent shrink-0" />
                  <span class="text-xs font-medium text-accent">
                    No credit card required — start free today!
                  </span>
                </div>

                <div class="space-y-3">
                  <Card
                    v-for="pkg in packages"
                    :key="pkg.id"
                    :class="[
                      'cursor-pointer transition-all duration-200 hover:shadow-md border-border',
                      selectedPackage === pkg.id ? 'ring-2 ring-primary border-primary' : '',
                      pkg.popular ? 'relative' : '',
                    ]"
                    @click="selectedPackage = pkg.id"
                  >
                    <span
                      v-if="pkg.popular"
                      class="absolute -top-2.5 left-4 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-primary text-primary-foreground"
                    >
                      Most Popular
                    </span>
                    <CardContent class="p-3.5 flex items-start gap-3">
                      <div
                        :class="[
                          'w-5 h-5 rounded-full border-2 mt-0.5 flex items-center justify-center shrink-0',
                          selectedPackage === pkg.id
                            ? 'border-primary bg-primary'
                            : 'border-muted-foreground/30',
                        ]"
                      >
                        <Check
                          v-if="selectedPackage === pkg.id"
                          class="w-3 h-3 text-primary-foreground"
                        />
                      </div>
                      <div class="flex-1 min-w-0">
                        <div class="flex items-baseline justify-between">
                          <h3 class="font-semibold text-foreground text-sm">
                            {{ pkg.name }}
                          </h3>
                          <div class="text-right">
                            <span
                              v-if="billingCycle === 'yearly' && pkg.monthlyPrice > 0"
                              class="text-xs text-muted-foreground line-through mr-1.5"
                            >
                              ${{ pkg.monthlyPrice }}
                            </span>
                            <span class="text-base font-bold text-foreground">
                              {{
                                (billingCycle === 'yearly'
                                  ? pkg.yearlyPrice
                                  : pkg.monthlyPrice) === 0
                                  ? 'Free'
                                  : `$${billingCycle === 'yearly' ? pkg.yearlyPrice : pkg.monthlyPrice}`
                              }}
                            </span>
                            <span class="text-xs text-muted-foreground font-normal">
                              /mo
                            </span>
                          </div>
                        </div>
                        <p class="text-xs text-muted-foreground mt-0.5">
                          Up to {{ pkg.employees }} employees ·
                          {{ pkg.costPerEmployee }}/emp
                        </p>
                        <div class="flex flex-wrap gap-1 mt-1.5">
                          <span
                            v-for="f in pkg.features"
                            :key="f"
                            class="text-[10px] bg-muted px-1.5 py-0.5 rounded text-muted-foreground"
                          >
                            {{ f }}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div class="flex gap-3 mt-6">
                  <Button
                    variant="outline"
                    class="flex-1"
                    @click="prevStep"
                  >
                    <ArrowLeft class="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button
                    class="flex-1 btn-primary"
                    @click="handleSubmit"
                  >
                    Continue to Checkout
                    <ArrowRight class="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            </div>
          </CardContent>
        </Card>

        <p class="text-center text-sm text-muted-foreground mt-5">
          Already have an account?
          <button
            type="button"
            class="text-primary font-medium hover:underline"
            @click="router.push('/login')"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

