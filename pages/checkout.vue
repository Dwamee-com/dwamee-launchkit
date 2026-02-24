<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'

import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Card from '@/components/ui/card.vue'
import CardContent from '@/components/ui/card-content.vue'
import Checkbox from '@/components/ui/checkbox.vue'
import { useRegistrationStore } from '@/stores/registration'
import {
  User,
  Building2,
  CreditCard,
  Package,
  Tag,
  Check,
  ArrowLeft,
  Shield,
  Sparkles,
  MapPin,
  BarChart3,
  Bell,
  FileText,
  Zap,
} from 'lucide-vue-next'

const router = useRouter()
const registrationStore = useRegistrationStore()

const addonServices = [
  { id: 'geofencing', name: 'Advanced Geofencing', description: 'GPS-based attendance with polygon zones', price: 15, discountPrice: 10, icon: MapPin },
  { id: 'analytics', name: 'Advanced Analytics', description: 'Detailed reports & workforce insights', price: 20, icon: BarChart3 },
  { id: 'notifications', name: 'Smart Notifications', description: 'Automated alerts for managers & employees', price: 8, icon: Bell },
  { id: 'payroll', name: 'Payroll Integration', description: 'Auto-calculate salaries & overtime', price: 25, discountPrice: 18, icon: FileText },
  { id: 'api', name: 'API Access', description: 'Connect with your existing systems', price: 30, icon: Zap },
] as const

const packages = {
  starter: { name: 'Starter', price: 0, yearlyPrice: 0, employees: 10 },
  professional: { name: 'Professional', price: 49, yearlyPrice: 39, employees: 50 },
  enterprise: { name: 'Enterprise', price: 149, yearlyPrice: 119, employees: 500 },
} as const

const defaultRegData = {
  personal: { username: 'Ahmed Mohamed', phone: '+20 123 456 7890', nationality: 'Egyptian' },
  org: { name: 'TechCorp Egypt', location: 'Cairo, Egypt' },
  selectedPackage: 'professional',
  billingCycle: 'monthly' as 'monthly' | 'yearly',
}

const regData = computed(() => {
  if (registrationStore.personal && registrationStore.org && registrationStore.selectedPackage) {
    return {
      personal: registrationStore.personal,
      org: registrationStore.org,
      selectedPackage: registrationStore.selectedPackage,
      billingCycle: registrationStore.billingCycle,
    }
  }
  return defaultRegData
})

const selectedAddons = ref<string[]>([])
const coupon = ref('')
const couponApplied = ref(false)
const couponDiscount = ref(0)

const pkgKey = computed(() => (regData.value.selectedPackage in packages ? regData.value.selectedPackage : 'starter') as keyof typeof packages)
const pkg = computed(() => packages[pkgKey.value])
const isYearly = computed(() => regData.value.billingCycle === 'yearly')
const basePrice = computed(() => (isYearly.value ? pkg.value.yearlyPrice : pkg.value.price))

const addonsTotal = computed(() =>
  selectedAddons.value.reduce((sum, id) => {
    const svc = addonServices.find(s => s.id === id)
    return sum + (svc?.discountPrice ?? svc?.price ?? 0)
  }, 0),
)

const subtotal = computed(() => basePrice.value + addonsTotal.value)
const discount = computed(() =>
  couponApplied.value ? Math.round((subtotal.value * couponDiscount.value) / 100) : 0,
)
const total = computed(() => subtotal.value - discount.value)

const toggleAddon = (id: string) => {
  if (selectedAddons.value.includes(id)) {
    selectedAddons.value = selectedAddons.value.filter(a => a !== id)
  } else {
    selectedAddons.value = [...selectedAddons.value, id]
  }
}

const applyCoupon = () => {
  const code = coupon.value.toLowerCase()
  if (code === 'dwamee20') {
    couponApplied.value = true
    couponDiscount.value = 20
  } else if (code === 'welcome10') {
    couponApplied.value = true
    couponDiscount.value = 10
  } else {
    couponApplied.value = false
    couponDiscount.value = 0
  }
}

const handleConfirm = () => {
  router.push('/dashboard/branches')
}
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
        { delay: 0, x: '5%', y: '10%', size: 50, rotate: 12 },
        { delay: 1.5, x: '85%', y: '15%', size: 40, rotate: -8 },
        { delay: 0.8, x: '90%', y: '60%', size: 55, rotate: 20 },
        { delay: 2, x: '8%', y: '75%', size: 45, rotate: -15 },
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
      :class="['absolute grid grid-cols-3 gap-1.5', classes]"
    >
      <motion.div
        v-for="i in 9"
        :key="i"
        class="w-1 h-1 rounded-full bg-primary/15"
        :animate="{ opacity: [0.2, 0.5, 0.2], scale: [0.8, 1.2, 0.8] }"
        :transition="{
          duration: 3,
          delay: (i - 1) * 0.12,
          repeat: Infinity,
        }"
      />
    </div>

    <motion.div
      class="absolute top-[15%] right-[12%]"
      :animate="{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }"
      :transition="{ duration: 6, repeat: Infinity }"
    >
      <Sparkles class="w-5 h-5 text-primary/20" />
    </motion.div>
    <motion.div
      class="absolute bottom-[25%] left-[10%]"
      :animate="{ rotate: [0, -180, -360], scale: [1, 0.7, 1] }"
      :transition="{ duration: 7, delay: 1, repeat: Infinity }"
    >
      <Sparkles class="w-4 h-4 text-primary/15" />
    </motion.div>

    <div class="relative z-10 max-w-4xl mx-auto px-4 py-10">
      <motion.div
        :initial="{ y: -20, opacity: 0 }"
        :animate="{ y: 0, opacity: 1 }"
        class="text-center mb-8"
      >
        <h1 class="text-3xl font-bold text-primary">
          Dwamee
        </h1>
        <p class="text-muted-foreground text-sm mt-1">
          Review &amp; Confirm Your Order
        </p>
      </motion.div>

      <div class="grid md:grid-cols-5 gap-6">
        <div class="md:col-span-3 space-y-5">
          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.1 }"
          >
            <Card class="border-border shadow-sm">
              <CardContent class="p-5">
                <h3 class="font-semibold text-foreground flex items-center gap-2 mb-4">
                  <User class="w-4 h-4 text-primary" />
                  Account Summary
                </h3>
                <div class="grid sm:grid-cols-2 gap-4">
                  <div class="space-y-2">
                    <p class="text-xs text-muted-foreground uppercase tracking-wider">
                      Personal
                    </p>
                    <div class="space-y-1 text-sm">
                      <p>
                        <span class="text-muted-foreground">Name:</span>
                        <span class="font-medium text-foreground">
                          {{ regData.personal.username }}
                        </span>
                      </p>
                      <p>
                        <span class="text-muted-foreground">Phone:</span>
                        <span class="font-medium text-foreground">
                          {{ regData.personal.phone }}
                        </span>
                      </p>
                      <p>
                        <span class="text-muted-foreground">Nationality:</span>
                        <span class="font-medium text-foreground">
                          {{ regData.personal.nationality }}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div class="space-y-2">
                    <p class="text-xs text-muted-foreground uppercase tracking-wider">
                      Organization
                    </p>
                    <div class="space-y-1 text-sm">
                      <p>
                        <span class="text-muted-foreground">Name:</span>
                        <span class="font-medium text-foreground">
                          {{ regData.org.name }}
                        </span>
                      </p>
                      <p>
                        <span class="text-muted-foreground">Location:</span>
                        <span class="font-medium text-foreground">
                          {{ regData.org.location }}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div class="mt-4 pt-3 border-t border-border">
                  <div class="flex items-center justify-between">
                    <div class="flex items-center gap-2">
                      <Package class="w-4 h-4 text-primary" />
                      <span class="text-sm font-semibold text-foreground">
                        {{ pkg.name }} Plan
                      </span>
                    </div>
                    <div class="text-right">
                      <span class="text-lg font-bold text-foreground">
                        ${{ basePrice }}
                      </span>
                      <span class="text-xs text-muted-foreground">
                        /{{ isYearly ? 'mo (yearly)' : 'mo' }}
                      </span>
                    </div>
                  </div>
                  <p class="text-xs text-muted-foreground mt-1">
                    Up to {{ pkg.employees }} employees
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.2 }"
          >
            <Card class="border-border shadow-sm">
              <CardContent class="p-5">
                <div class="flex items-center justify-between mb-1">
                  <h3 class="font-semibold text-foreground flex items-center gap-2">
                    <Zap class="w-4 h-4 text-primary" />
                    Add-on Services
                  </h3>
                </div>
                <div
                  class="flex items-center gap-2 mb-4 rounded-lg bg-accent/10 p-2"
                >
                  <Shield class="w-3.5 h-3.5 text-accent shrink-0" />
                  <span class="text-xs font-medium text-accent">
                    All add-ons include a 7-day free trial!
                  </span>
                </div>
                <div class="space-y-2.5">
                  <motion.div
                    v-for="svc in addonServices"
                    :key="svc.id"
                    :whileHover="{ scale: 1.01 }"
                    :class="[
                      'flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all',
                      selectedAddons.includes(svc.id)
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/30',
                    ]"
                    @click="toggleAddon(svc.id)"
                  >
                    <Checkbox
                      :model-value="selectedAddons.includes(svc.id)"
                      class="pointer-events-none"
                    />
                    <div
                      :class="[
                        'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                        selectedAddons.includes(svc.id)
                          ? 'bg-primary/10'
                          : 'bg-muted',
                      ]"
                    >
                      <component
                        :is="svc.icon"
                        :class="[
                          'w-4 h-4',
                          selectedAddons.includes(svc.id)
                            ? 'text-primary'
                            : 'text-muted-foreground',
                        ]"
                      />
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="text-sm font-medium text-foreground">
                        {{ svc.name }}
                      </p>
                      <p class="text-xs text-muted-foreground">
                        {{ svc.description }}
                      </p>
                    </div>
                    <div class="text-right shrink-0">
                      <template v-if="svc.discountPrice">
                        <p class="text-xs text-muted-foreground line-through">
                          ${{ svc.price }}/mo
                        </p>
                        <p class="text-sm font-bold text-primary">
                          ${{ svc.discountPrice }}/mo
                        </p>
                      </template>
                      <p
                        v-else
                        class="text-sm font-bold text-foreground"
                      >
                        ${{ svc.price }}/mo
                      </p>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div class="md:col-span-2">
          <motion.div
            :initial="{ opacity: 0, y: 20 }"
            :animate="{ opacity: 1, y: 0 }"
            :transition="{ delay: 0.3 }"
            class="sticky top-6"
          >
            <Card class="border-border shadow-lg">
              <CardContent class="p-5">
                <h3 class="font-semibold text-foreground flex items-center gap-2 mb-4">
                  <CreditCard class="w-4 h-4 text-primary" />
                  Order Summary
                </h3>

                <div class="space-y-2.5 text-sm">
                  <div class="flex justify-between">
                    <span class="text-muted-foreground">
                      {{ pkg.name }} Plan
                    </span>
                    <span class="font-medium text-foreground">
                      ${{ basePrice }}/mo
                    </span>
                  </div>

                  <div
                    v-for="id in selectedAddons"
                    :key="id"
                    class="flex justify-between"
                  >
                    <span class="text-muted-foreground">
                      {{ addonServices.find(s => s.id === id)?.name }}
                    </span>
                    <span class="font-medium text-foreground">
                      ${{ addonServices.find(s => s.id === id)?.discountPrice ?? addonServices.find(s => s.id === id)?.price }}/mo
                    </span>
                  </div>

                  <div class="border-t border-border pt-2.5 mt-2.5">
                    <div class="flex justify-between">
                      <span class="text-muted-foreground">
                        Subtotal
                      </span>
                      <span class="font-medium text-foreground">
                        ${{ subtotal }}/mo
                      </span>
                    </div>
                  </div>

                  <motion.div
                    v-if="couponApplied"
                    :initial="{ opacity: 0, height: 0 }"
                    :animate="{ opacity: 1, height: 'auto' }"
                    class="flex justify-between text-accent"
                  >
                    <span>
                      Coupon ({{ couponDiscount }}% off)
                    </span>
                    <span class="font-medium">
                      -${{ discount }}
                    </span>
                  </motion.div>

                  <div class="border-t border-border pt-2.5">
                    <div class="flex justify-between items-baseline">
                      <span class="font-semibold text-foreground">
                        Total
                      </span>
                      <div>
                        <span
                          v-if="couponApplied"
                          class="text-xs text-muted-foreground line-through mr-2"
                        >
                          ${{ subtotal }}
                        </span>
                        <span class="text-xl font-bold text-primary">
                          ${{ total }}
                        </span>
                        <span class="text-xs text-muted-foreground">
                          /mo
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="mt-5">
                  <p class="text-xs font-medium text-muted-foreground mb-1.5 flex items-center gap-1">
                    <Tag class="w-3 h-3" />
                    Have a coupon?
                  </p>
                  <div class="flex gap-2">
                    <Input
                      v-model="coupon"
                      placeholder="Enter code"
                      class="text-sm h-9"
                      @input="couponApplied = false"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      class="shrink-0 h-9"
                      @click="applyCoupon"
                    >
                      Apply
                    </Button>
                  </div>
                  <motion.p
                    v-if="couponApplied"
                    :initial="{ opacity: 0 }"
                    :animate="{ opacity: 1 }"
                    class="text-xs text-accent mt-1.5 flex items-center gap-1"
                  >
                    <Check class="w-3 h-3" />
                    Coupon applied! {{ couponDiscount }}% off
                  </motion.p>
                </div>

                <div class="mt-4 rounded-lg bg-accent/10 p-3 text-center">
                  <Shield class="w-5 h-5 text-accent mx-auto mb-1" />
                  <p class="text-xs font-semibold text-accent">
                    7-Day Free Trial
                  </p>
                  <p class="text-[10px] text-muted-foreground mt-0.5">
                    No credit card required. Cancel anytime.
                  </p>
                </div>

                <Button
                  class="w-full mt-4 btn-primary"
                  @click="handleConfirm"
                >
                  Start Free Trial
                </Button>

                <button
                  type="button"
                  class="w-full text-center text-xs text-muted-foreground mt-3 hover:text-primary transition-colors flex items-center justify-center gap-1"
                  @click="router.push('/register')"
                >
                  <ArrowLeft class="w-3 h-3" />
                  Back to registration
                </button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</template>

