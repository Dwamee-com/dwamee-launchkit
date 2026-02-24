<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { motion } from 'motion-v'

import Button from '@/components/ui/button.vue'
import Input from '@/components/ui/input.vue'
import Label from '@/components/ui/label.vue'
import { Phone, Lock, ArrowRight, Sparkles } from 'lucide-vue-next'

const router = useRouter()

const phone = ref('')
const password = ref('')

const floatingShapes = [
  { delay: 0, x: '10%', y: '15%', size: 60, rotate: 12 },
  { delay: 1.5, x: '70%', y: '10%', size: 40, rotate: -8 },
  { delay: 0.8, x: '80%', y: '60%', size: 55, rotate: 20 },
  { delay: 2, x: '15%', y: '70%', size: 45, rotate: -15 },
  { delay: 1.2, x: '50%', y: '80%', size: 35, rotate: 30 },
  { delay: 0.5, x: '60%', y: '35%', size: 50, rotate: -25 },
] as const

const cornerDotPositions: Record<string, string> = {
  'top-left': 'top-6 left-6',
  'top-right': 'top-6 right-6',
  'bottom-left': 'bottom-6 left-6',
  'bottom-right': 'bottom-6 right-6',
}

const handleLogin = (e: Event) => {
  e.preventDefault()
  router.push('/dashboard/branches')
}

const goToRegister = () => {
  router.push('/register')
}
</script>

<template>
  <div class="min-h-screen flex">
    <!-- Left decorative panel -->
    <div class="hidden lg:block lg:w-1/2 relative overflow-hidden">
      <div
        class="absolute inset-0"
        :style="{ backgroundImage: 'var(--gradient-primary)' }"
      />

      <!-- Rectangle grid pattern -->
      <div
        class="absolute inset-0 opacity-[0.06]"
        :style="{
          backgroundImage: `
              linear-gradient(hsl(var(--primary-foreground)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary-foreground)) 1px, transparent 1px)
            `,
          backgroundSize: '48px 48px',
        }"
      />

      <!-- Floating rectangles with dots at corners -->
      <motion.div
        v-for="shape in floatingShapes"
        :key="`${shape.x}-${shape.y}`"
        class="absolute border border-primary-foreground/20 rounded-lg"
        :style="{
          left: shape.x,
          top: shape.y,
          width: `${shape.size}px`,
          height: `${shape.size}px`,
        }"
        :initial="{ opacity: 0, rotate: 0, scale: 0.5 }"
        :animate="{
          opacity: [0.15, 0.35, 0.15],
          rotate: [shape.rotate, shape.rotate + 90, shape.rotate],
          scale: [0.8, 1, 0.8],
          y: [0, -15, 0],
        }"
        :transition="{
          duration: 8,
          delay: shape.delay,
          repeat: Infinity,
          ease: 'easeInOut',
        }"
      />

      <!-- Corner dot patterns -->
      <div
        v-for="(classes, position) in cornerDotPositions"
        :key="position"
        class="absolute grid grid-cols-3 gap-2"
        :class="classes"
      >
        <motion.div
          v-for="i in 9"
          :key="i"
          class="w-1.5 h-1.5 rounded-full bg-primary-foreground/30"
          :initial="{ opacity: 0, scale: 0 }"
          :animate="{ opacity: [0.2, 0.6, 0.2], scale: [0.8, 1.2, 0.8] }"
          :transition="{
            duration: 3,
            delay: (i - 1) * 0.15,
            repeat: Infinity,
          }"
        />
      </div>

      <!-- Sparkle accents -->
      <motion.div
        class="absolute top-[20%] right-[20%]"
        :animate="{ rotate: [0, 180, 360], scale: [0.8, 1.2, 0.8] }"
        :transition="{ duration: 6, repeat: Infinity }"
      >
        <Sparkles class="w-5 h-5 text-primary-foreground/30" />
      </motion.div>

      <motion.div
        class="absolute bottom-[30%] left-[25%]"
        :animate="{ rotate: [0, -180, -360], scale: [1, 0.7, 1] }"
        :transition="{ duration: 7, delay: 1, repeat: Infinity }"
      >
        <Sparkles class="w-4 h-4 text-primary-foreground/25" />
      </motion.div>

      <div
        class="relative z-10 flex flex-col items-center justify-center h-full p-12 text-center"
      >
        <motion.h1
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          class="text-5xl font-bold text-primary-foreground mb-4"
        >
          Dwamee
        </motion.h1>

        <motion.p
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ delay: 0.1 }"
          class="text-primary-foreground/80 text-xl max-w-md leading-relaxed"
        >
          Precision attendance &amp; workforce management for modern teams.
        </motion.p>

        <motion.div
          :initial="{ y: 20, opacity: 0 }"
          :animate="{ y: 0, opacity: 1 }"
          :transition="{ delay: 0.2 }"
          class="mt-12 grid grid-cols-3 gap-6 text-primary-foreground/70"
        >
          <div
            v-for="stat in [
              { num: '10K+', label: 'Users' },
              { num: '99.9%', label: 'Uptime' },
              { num: '50+', label: 'Countries' },
            ]"
            :key="stat.label"
            class="text-center"
          >
            <p class="text-2xl font-bold text-primary-foreground">
              {{ stat.num }}
            </p>
            <p class="text-sm">
              {{ stat.label }}
            </p>
          </div>
        </motion.div>
      </div>
    </div>

    <!-- Right login form -->
    <div
      class="flex-1 flex items-center justify-center p-6 sm:p-10 bg-background relative overflow-hidden"
    >
      <div
        class="absolute inset-0 opacity-[0.03]"
        :style="{
          backgroundImage: `
              linear-gradient(hsl(var(--primary)) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--primary)) 1px, transparent 1px)
            `,
          backgroundSize: '40px 40px',
        }"
      />

      <motion.div
        :initial="{ opacity: 0, y: 20 }"
        :animate="{ opacity: 1, y: 0 }"
        class="w-full max-w-sm relative z-10"
      >
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-foreground">
            Welcome back
          </h2>
          <p class="text-muted-foreground mt-2">
            Sign in to your Dwamee account
          </p>
        </div>

        <form @submit="handleLogin" class="space-y-5">
          <div>
            <Label for="phone">Phone Number</Label>
            <div class="relative mt-1.5">
              <Phone
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />
              <Input
                id="phone"
                v-model="phone"
                placeholder="+20 1XX XXX XXXX"
                class="pl-10"
              />
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <Label for="password">Password</Label>
              <button
                type="button"
                class="text-xs text-primary hover:underline"
              >
                Forgot password?
              </button>
            </div>
            <div class="relative mt-1.5">
              <Lock
                class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground"
              />
              <Input
                id="password"
                v-model="password"
                type="password"
                placeholder="••••••••"
                class="pl-10"
              />
            </div>
          </div>

          <Button type="submit" class="w-full btn-primary">
            Sign In
            <ArrowRight class="w-4 h-4 ml-2" />
          </Button>
        </form>

        <p class="text-center text-sm text-muted-foreground mt-6">
          Don't have an account?
          <button
            type="button"
            @click="goToRegister"
            class="text-primary font-medium hover:underline"
          >
            Create one
          </button>
        </p>
      </motion.div>
    </div>
  </div>
</template>

