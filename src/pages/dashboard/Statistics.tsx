import { useState, Suspense, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Html } from "@react-three/drei";
import { motion } from "framer-motion";
import { Building2, Globe, Users, TrendingUp, MapPin } from "lucide-react";
import * as THREE from "three";

// --- Data ---
interface BranchData {
  id: number;
  name: string;
  position: [number, number, number];
  color: string;
  userCount: number;
  groups: { name: string; attendance: number; absence: number; vacations: number }[];
}

const branchesData: BranchData[] = [
  {
    id: 1, name: "Cairo HQ", position: [-4, 0, 0], color: "hsl(211, 65%, 47%)",
    userCount: 45,
    groups: [
      { name: "Engineering", attendance: 18, absence: 1, vacations: 2 },
      { name: "Design", attendance: 8, absence: 0, vacations: 1 },
      { name: "HR", attendance: 6, absence: 1, vacations: 0 },
    ],
  },
  {
    id: 2, name: "Alexandria", position: [0, 0, 0], color: "hsl(160, 72%, 40%)",
    userCount: 28,
    groups: [
      { name: "Sales", attendance: 12, absence: 2, vacations: 1 },
      { name: "Support", attendance: 10, absence: 1, vacations: 2 },
    ],
  },
  {
    id: 3, name: "Giza Office", position: [4, 0, 0], color: "hsl(280, 60%, 55%)",
    userCount: 32,
    groups: [
      { name: "Operations", attendance: 14, absence: 2, vacations: 1 },
      { name: "Finance", attendance: 9, absence: 0, vacations: 1 },
      { name: "Legal", attendance: 5, absence: 1, vacations: 0 },
    ],
  },
  {
    id: 4, name: "Mansoura", position: [8, 0, 0], color: "hsl(30, 80%, 55%)",
    userCount: 18,
    groups: [
      { name: "Logistics", attendance: 10, absence: 2, vacations: 1 },
      { name: "Warehouse", attendance: 5, absence: 1, vacations: 0 },
    ],
  },
];

const countryData = [
  { name: "Egypt", code: "EG", users: 100, color: "hsl(211, 65%, 47%)" },
  { name: "Saudi Arabia", code: "SA", users: 50, color: "hsl(160, 72%, 40%)" },
  { name: "UAE", code: "AE", users: 35, color: "hsl(280, 60%, 55%)" },
  { name: "Jordan", code: "JO", users: 20, color: "hsl(30, 80%, 55%)" },
  { name: "Morocco", code: "MA", users: 15, color: "hsl(340, 70%, 55%)" },
  { name: "Kuwait", code: "KW", users: 12, color: "hsl(190, 65%, 45%)" },
];

// --- 3D Components ---
function Building({ branch, onHover }: { branch: BranchData; onHover: (b: BranchData | null) => void }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15;
      const targetScale = hovered ? 1.08 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
    }
  });

  const height = 1.2 + branch.groups.length * 0.5;

  return (
    <group position={branch.position}>
      {/* Main building */}
      <mesh
        ref={meshRef}
        position={[0, height / 2, 0]}
        onPointerEnter={() => { setHovered(true); onHover(branch); }}
        onPointerLeave={() => { setHovered(false); onHover(null); }}
        castShadow
      >
        <boxGeometry args={[1.6, height, 1.6]} />
        <meshStandardMaterial color={branch.color} metalness={0.3} roughness={0.5} />
      </mesh>

      {/* Windows */}
      {Array.from({ length: Math.floor(height / 0.5) }).map((_, i) => (
        <group key={i}>
          <mesh position={[0.81, 0.4 + i * 0.5, 0.4]}>
            <boxGeometry args={[0.02, 0.3, 0.25]} />
            <meshStandardMaterial color="hsl(200,80%,85%)" emissive="hsl(200,80%,85%)" emissiveIntensity={0.3} />
          </mesh>
          <mesh position={[0.81, 0.4 + i * 0.5, -0.4]}>
            <boxGeometry args={[0.02, 0.3, 0.25]} />
            <meshStandardMaterial color="hsl(200,80%,85%)" emissive="hsl(200,80%,85%)" emissiveIntensity={0.3} />
          </mesh>
        </group>
      ))}

      {/* Roof */}
      <mesh position={[0, height + 0.1, 0]}>
        <boxGeometry args={[1.8, 0.15, 1.8]} />
        <meshStandardMaterial color="hsl(215,25%,25%)" />
      </mesh>

      {/* Group blocks at base */}
      {branch.groups.map((group, i) => {
        const offsetX = (i - (branch.groups.length - 1) / 2) * 0.55;
        return (
          <mesh key={group.name} position={[offsetX, -0.15, 1.3]}>
            <boxGeometry args={[0.45, 0.3, 0.4]} />
            <meshStandardMaterial color={branch.color} opacity={0.6} transparent />
          </mesh>
        );
      })}

      {/* Label */}
      <Html position={[0, height + 0.6, 0]} center distanceFactor={8}>
        <div className="text-center whitespace-nowrap pointer-events-none">
          <p className="text-xs font-bold text-foreground bg-background/90 px-2 py-0.5 rounded-md border border-border shadow-sm">
            {branch.name}
          </p>
        </div>
      </Html>
    </group>
  );
}

function Ground() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[2, -0.3, 0]} receiveShadow>
      <planeGeometry args={[20, 10]} />
      <meshStandardMaterial color="hsl(210, 33%, 95%)" />
    </mesh>
  );
}

function Scene({ onHover }: { onHover: (b: BranchData | null) => void }) {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 8, 5]} intensity={1} castShadow />
      <pointLight position={[-5, 5, -5]} intensity={0.4} />
      <Ground />
      {branchesData.map((b) => (
        <Building key={b.id} branch={b} onHover={onHover} />
      ))}
      <OrbitControls enablePan={false} maxPolarAngle={Math.PI / 2.2} minDistance={5} maxDistance={18} target={[2, 1, 0]} />
    </>
  );
}

// --- SVG Map ---
function WorldMap() {
  const [hoveredCountry, setHoveredCountry] = useState<typeof countryData[0] | null>(null);
  const totalUsers = countryData.reduce((s, c) => s + c.users, 0);

  return (
    <div className="space-y-6">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {countryData.map((country, i) => (
          <motion.div
            key={country.code}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onMouseEnter={() => setHoveredCountry(country)}
            onMouseLeave={() => setHoveredCountry(null)}
          >
            <Card className={`cursor-pointer transition-all duration-200 ${hoveredCountry?.code === country.code ? "ring-2 ring-primary shadow-lg scale-105" : "hover:shadow-md"}`}>
              <CardContent className="p-4 text-center">
                <div className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center text-primary-foreground font-bold text-sm" style={{ backgroundColor: country.color }}>
                  {country.code}
                </div>
                <p className="font-semibold text-foreground text-sm">{country.name}</p>
                <p className="text-2xl font-bold text-foreground mt-1">{country.users}</p>
                <p className="text-xs text-muted-foreground">employees</p>
                <div className="mt-2 bg-muted rounded-full h-1.5 overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{ width: `${(country.users / totalUsers) * 100}%`, backgroundColor: country.color }} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* SVG Map visualization */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2"><Globe className="w-4 h-4 text-primary" /> Geographic Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative w-full" style={{ paddingBottom: "50%" }}>
            <svg viewBox="0 0 1000 500" className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
              {/* Simplified world map outlines */}
              <rect fill="hsl(210,33%,97%)" width="1000" height="500" rx="8" />
              
              {/* Africa/Middle East region */}
              <path d="M450,180 L520,170 L540,200 L560,220 L550,280 L530,320 L500,350 L470,340 L440,300 L430,250 L440,210Z" fill="hsl(210,20%,90%)" stroke="hsl(214,20%,85%)" strokeWidth="1" />
              {/* Europe */}
              <path d="M420,100 L500,80 L540,100 L530,150 L500,170 L450,170 L430,140Z" fill="hsl(210,20%,90%)" stroke="hsl(214,20%,85%)" strokeWidth="1" />
              {/* Asia */}
              <path d="M540,100 L700,80 L750,120 L740,200 L680,220 L600,200 L560,170Z" fill="hsl(210,20%,90%)" stroke="hsl(214,20%,85%)" strokeWidth="1" />
              {/* North America */}
              <path d="M100,80 L280,60 L320,120 L300,200 L200,220 L120,180 L90,130Z" fill="hsl(210,20%,90%)" stroke="hsl(214,20%,85%)" strokeWidth="1" />
              {/* South America */}
              <path d="M200,250 L280,230 L310,280 L300,370 L260,400 L220,380 L190,320Z" fill="hsl(210,20%,90%)" stroke="hsl(214,20%,85%)" strokeWidth="1" />

              {/* Country markers */}
              {[
                { code: "EG", x: 510, y: 220, ...countryData[0] },
                { code: "SA", x: 560, y: 230, ...countryData[1] },
                { code: "AE", x: 590, y: 225, ...countryData[2] },
                { code: "JO", x: 535, y: 200, ...countryData[3] },
                { code: "MA", x: 440, y: 210, ...countryData[4] },
                { code: "KW", x: 570, y: 210, ...countryData[5] },
              ].map((c) => {
                const radius = 8 + (c.users / 10);
                const isHovered = hoveredCountry?.code === c.code;
                return (
                  <g key={c.code}
                    onMouseEnter={() => setHoveredCountry(countryData.find(cd => cd.code === c.code) || null)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    className="cursor-pointer"
                  >
                    <circle cx={c.x} cy={c.y} r={radius + 4} fill={c.color} opacity={0.15}>
                      <animate attributeName="r" values={`${radius + 2};${radius + 8};${radius + 2}`} dur="3s" repeatCount="indefinite" />
                    </circle>
                    <circle cx={c.x} cy={c.y} r={radius} fill={c.color} stroke="white" strokeWidth="2" opacity={isHovered ? 1 : 0.85} />
                    <text x={c.x} y={c.y + 1} textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">{c.users}</text>
                    {isHovered && (
                      <g>
                        <rect x={c.x - 40} y={c.y - radius - 30} width="80" height="22" rx="4" fill="hsl(215,25%,15%)" opacity="0.9" />
                        <text x={c.x} y={c.y - radius - 15} textAnchor="middle" fill="white" fontSize="10" fontWeight="600">{c.name}</text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// --- Main Component ---
export default function Statistics() {
  const [hoveredBranch, setHoveredBranch] = useState<BranchData | null>(null);
  const totalUsers = branchesData.reduce((s, b) => s + b.userCount, 0);
  const totalGroups = branchesData.reduce((s, b) => s + b.groups.length, 0);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-foreground">Statistics & Overview</h1>
        <p className="text-muted-foreground text-sm">3D branch visualization and geographic distribution</p>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { label: "Total Branches", value: branchesData.length, icon: Building2, color: "text-primary bg-primary/10" },
          { label: "Total Groups", value: totalGroups, icon: Users, color: "text-accent bg-accent/10" },
          { label: "Total Employees", value: totalUsers, icon: Users, color: "text-primary bg-primary/10" },
          { label: "Countries", value: countryData.length, icon: Globe, color: "bg-accent/10 text-accent" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card>
              <CardContent className="p-4 flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                  <stat.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-lg font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Tabs defaultValue="branches" className="space-y-4">
        <TabsList>
          <TabsTrigger value="branches" className="gap-1.5"><Building2 className="w-4 h-4" /> 3D Branches</TabsTrigger>
          <TabsTrigger value="map" className="gap-1.5"><Globe className="w-4 h-4" /> World Map</TabsTrigger>
        </TabsList>

        <TabsContent value="branches" className="space-y-4">
          {/* 3D Canvas */}
          <Card className="overflow-hidden">
            <CardContent className="p-0 relative" style={{ height: "480px" }}>
              <Suspense fallback={<div className="flex items-center justify-center h-full text-muted-foreground">Loading 3D scene...</div>}>
                <Canvas shadows camera={{ position: [2, 6, 12], fov: 45 }}>
                  <Scene onHover={setHoveredBranch} />
                </Canvas>
              </Suspense>

              {/* Hover info panel */}
              {hoveredBranch && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="absolute top-4 right-4 w-72"
                >
                  <Card className="border-primary/30 shadow-lg bg-background/95 backdrop-blur">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: hoveredBranch.color }} />
                        {hoveredBranch.name}
                      </CardTitle>
                      <p className="text-xs text-muted-foreground">{hoveredBranch.userCount} employees · {hoveredBranch.groups.length} groups</p>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {hoveredBranch.groups.map((g) => (
                        <div key={g.name} className="p-2.5 bg-muted/50 rounded-lg">
                          <p className="text-sm font-medium text-foreground mb-1">{g.name}</p>
                          <div className="flex items-center gap-3 text-xs">
                            <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30 text-[10px]">
                              ✓ {g.attendance}
                            </Badge>
                            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]">
                              ✕ {g.absence}
                            </Badge>
                            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-[10px]">
                              🏖 {g.vacations}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </CardContent>
          </Card>

          {/* Branch cards below */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {branchesData.map((branch, i) => (
              <motion.div key={branch.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
                <Card className="hover:shadow-md transition-all hover:-translate-y-0.5">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: branch.color + "22" }}>
                        <Building2 className="w-4 h-4" style={{ color: branch.color }} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm">{branch.name}</p>
                        <p className="text-xs text-muted-foreground">{branch.userCount} users</p>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      {branch.groups.map((g) => (
                        <div key={g.name} className="flex items-center justify-between text-xs p-1.5 rounded bg-muted/50">
                          <span className="text-foreground font-medium">{g.name}</span>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <span className="text-accent">✓{g.attendance}</span>
                            <span className="text-destructive">✕{g.absence}</span>
                            <span className="text-primary">🏖{g.vacations}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="map">
          <WorldMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
