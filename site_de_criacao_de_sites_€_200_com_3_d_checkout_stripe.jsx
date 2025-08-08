import React, { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CheckCircle2, Globe, Smartphone, Zap, Sparkles, Star, Rocket, Shield, Wand2, Clock3, MessageCircle, ExternalLink } from "lucide-react";

// ⚙️ CONFIG — ajuste aqui se precisar
const STRIPE_CHECKOUT_URL = "https://buy.stripe.com/4gM8wPcjte4A1E49S15EY01";
const STRIPE_PUBLISHABLE_KEY = "pk_live_51RrzkVG66FI7TmLzYkJaExfi325WkXi6P7EpZ0YEPumPvjDWGvV9PVBgNKvP8HhZaboI68CpsomZbmh1jLWNlaor00QwelY22g";

// 🎯 Conteúdos
const TESTIMONIALS = [
  {
    name: "Joana Ribeiro",
    role: "Dona — Café Aurora",
    quote:
      "Em 5 dias tínhamos um site lindo, com reservas online. As vendas subiram e o atendimento ficou muito mais ágil!",
  },
  {
    name: "Miguel Santos",
    role: "Consultor de Marketing",
    quote:
      "Conversão absurda. O time cuidou de tudo: copy, visual e integração. Valeu cada euro.",
  },
  {
    name: "Carla Ferreira",
    role: "Terapeuta Holística",
    quote:
      "Meu site ficou moderno, rápido e fácil de editar. Atendimento excelente e humano.",
  },
];

const FEATURES = [
  { icon: <Zap />, title: "Alto desempenho", desc: "Carregamento rápido, SEO básico e métricas prontas." },
  { icon: <Smartphone />, title: "Responsivo", desc: "Perfeito em mobile, tablet e desktop." },
  { icon: <Globe />, title: "Pronto para vender", desc: "Checkout Stripe integrado e CTAs claros." },
  { icon: <Shield />, title: "Seguro", desc: "Boas práticas de segurança e SSL." },
  { icon: <Wand2 />, title: "Design premium", desc: "Microinterações e animações 3D elegantes." },
  { icon: <Clock3 />, title: "Entrega rápida", desc: "Projetos entregues em 3–5 dias úteis." },
];

const PORTFOLIO = [
  { title: "Loja Minimalista", tag: "E‑commerce", url: "#" },
  { title: "Clínica Viva", tag: "Saúde", url: "#" },
  { title: "Estúdio Orion", tag: "Criativo", url: "#" },
  { title: "Café Aurora", tag: "Gastronomia", url: "#" },
  { title: "Treine+", tag: "Fitness", url: "#" },
  { title: "Host Sun", tag: "Tech", url: "#" },
];

export default function App() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const success = params.get("success");
    const s = params.get("session_id"); // Stripe pode enviar ?session_id=cs_...
    setIsSuccess(success === "1" || success === "true");
    setSessionId(s);
  }, []);

  return (
    <div className="relative min-h-screen text-white overflow-x-hidden bg-gradient-to-b from-[#050505] via-[#0a0a0a] to-[#0e0e0e]">
      <ThreeBackground />
      <ParticlesOverlay />

      {/* NAV */}
      <div className="absolute inset-x-0 top-0 z-30 flex items-center justify-between px-6 py-4">
        <div className="text-lg font-semibold tracking-tight flex items-center gap-2">
          <Rocket className="opacity-80" /> Sua Agência
        </div>
        <div className="flex items-center gap-2">
          <a href="#portfolio" className="rounded-xl px-3 py-2 bg-white/5 hover:bg-white/10 transition">Portfólio</a>
          <a href="#testemunhos" className="rounded-xl px-3 py-2 bg-white/5 hover:bg-white/10 transition">Depoimentos</a>
          <a href="#checkout" className="rounded-xl px-3 py-2 bg-orange-500/90 hover:bg-orange-500 transition">Comprar</a>
        </div>
      </div>

      {/* HERO */}
      <section className="relative z-20 pt-28 pb-20 px-6 flex flex-col items-center text-center">
        <Floaty>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-extrabold leading-tight max-w-4xl"
          >
            Sites modernos com <span className="text-orange-400">animações 3D</span> por apenas <span className="text-orange-400">€200</span>
          </motion.h1>
        </Floaty>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="mt-4 text-base md:text-lg text-white/80 max-w-2xl"
        >
          Alta conversão, visual premium e integração Stripe. Você foca no seu negócio, nós cuidamos do digital.
        </motion.p>

        <motion.a
          id="checkout"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          href={STRIPE_CHECKOUT_URL}
          className="group mt-8 inline-flex items-center gap-3 rounded-2xl bg-orange-500/90 hover:bg-orange-500 px-6 py-3 text-lg font-semibold shadow-lg shadow-orange-500/20"
        >
          Comprar agora
          <ArrowRight className="transition group-hover:translate-x-0.5" />
        </motion.a>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-4 text-white/60"
        >
          <div className="flex items-center gap-2"><CheckCircle2 size={18}/> Sem mensalidades escondidas</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={18}/> Entrega em 3–5 dias úteis</div>
          <div className="flex items-center gap-2"><CheckCircle2 size={18}/> Suporte humano</div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mt-12 text-white/60 flex flex-col items-center gap-2"
        >
          <Sparkles className="animate-pulse" />
          <span className="text-sm">Role para ver mais</span>
        </motion.div>
      </section>

      {/* BENEFÍCIOS */}
      <section className="relative z-20 px-6 pb-16">
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.05}>
              <Card icon={f.icon} title={f.title} desc={f.desc} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PORTFÓLIO com tilt/parallax */}
      <section id="portfolio" className="relative z-20 px-6 pb-24">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Projetos e estilos que entregamos</h2>
        </Reveal>
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PORTFOLIO.map((p, idx) => (
            <Reveal key={p.title} delay={idx * 0.06}>
              <Tilt className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur group">
                <div className="flex items-center justify-between mb-3 opacity-80">
                  <span className="text-sm bg-white/10 px-2 py-1 rounded-full">{p.tag}</span>
                  <ExternalLink size={16} className="opacity-60 group-hover:opacity-100"/>
                </div>
                <div className="h-40 rounded-2xl bg-gradient-to-br from-white/10 to-white/0 relative overflow-hidden">
                  <div className="absolute inset-0 grid grid-cols-6 grid-rows-3 opacity-20">
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} className="border border-white/10" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center text-white/70 font-semibold">
                    {p.title}
                  </div>
                </div>
                <div className="mt-4 text-white/80 text-sm">
                  Layout premium com animações de entrada, seções de vendas e CTA forte.
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* DEPOIMENTOS */}
      <section id="testemunhos" className="relative z-20 px-6 pb-24">
        <Reveal>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">O que os clientes dizem</h2>
        </Reveal>
        <div className="mx-auto max-w-6xl grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <Tilt className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
                <div className="text-white/90">“{t.quote}”</div>
                <div className="mt-4 text-sm text-white/60">{t.name} • {t.role}</div>
                <div className="mt-3 flex gap-1 opacity-70">
                  <Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/><Star size={16}/>
                </div>
              </Tilt>
            </Reveal>
          ))}
        </div>
      </section>

      {/* COMO FUNCIONA */}
      <section className="relative z-20 px-6 pb-24">
        <div className="mx-auto max-w-5xl rounded-3xl bg-white/5 border border-white/10 p-6 md:p-10 backdrop-blur">
          <Reveal>
            <h2 className="text-3xl md:text-4xl font-bold">Como funciona</h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { step: "1", title: "Pagamento", desc: "Clique em Comprar via Stripe." },
              { step: "2", title: "Briefing", desc: "Coletamos conteúdo e referências." },
              { step: "3", title: "Entrega", desc: "Seu site pronto em até 5 dias." },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.07}>
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <div className="text-white/60 text-sm">Passo {s.step}</div>
                  <div className="text-xl font-semibold">{s.title}</div>
                  <div className="mt-2 text-white/70">{s.desc}</div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={STRIPE_CHECKOUT_URL} className="rounded-xl bg-orange-500/90 hover:bg-orange-500 px-5 py-3 font-semibold inline-flex items-center gap-2">
              Ir para o Checkout <ArrowRight size={18}/>
            </a>
            <a href="?success=1&session_id=cs_demo_12345" className="rounded-xl bg-white/10 hover:bg-white/20 px-5 py-3 font-semibold inline-flex items-center gap-2">
              Simular pós-pagamento
            </a>
          </div>

          {/* Pós-pagamento */}
          {isSuccess && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-6"
            >
              <h3 className="text-xl font-semibold text-emerald-300 flex items-center gap-2">
                <CheckCircle2 /> Pagamento confirmado
              </h3>
              <p className="mt-2 text-white/80">
                Obrigado! Recebemos seu pedido de criação de site por <span className="text-white">€200</span>.
              </p>
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="text-white/60 text-sm">Número do pedido</div>
                  <div className="font-mono text-white text-lg">{sessionId ?? "—"}</div>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="text-white/60 text-sm">Previsão de entrega</div>
                  <div className="text-white text-lg">3–5 dias úteis</div>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="text-white/60 text-sm">Contato</div>
                  <div className="text-white text-lg">support@suaagencia.com • +351 910 000 000</div>
                </div>
                <div className="rounded-xl bg-white/5 p-4">
                  <div className="text-white/60 text-sm">Detalhes</div>
                  <div className="text-white text-lg">Entraremos em contato para coletar briefing e conteúdos.</div>
                </div>
              </div>
              <p className="mt-4 text-white/70 text-sm">
                Para dados reais (nome, e‑mail, etc.), configure o <span className="text-white">success_url</span> com <code>{"?success=1&session_id={CHECKOUT_SESSION_ID}"}</code> e busque os detalhes via Webhook/SDK no seu backend.
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* FAQ + CTA final */}
      <section className="relative z-20 px-6 pb-24">
        <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Reveal>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Perguntas frequentes</h2>
            </Reveal>
            <div className="space-y-3">
              {[
                { q: "O que está incluído nos €200?", a: "Site de uma página (landing) com seções de vendas, integrações básicas e otimizado para conversão." },
                { q: "Vocês hospedam?", a: "Podemos orientar na contratação e configurar por você." },
                { q: "Prazo?", a: "3–5 dias úteis após recebermos o briefing." },
              ].map((f, i) => (
                <Reveal key={f.q} delay={i * 0.05}>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                    <div className="font-semibold">{f.q}</div>
                    <div className="text-white/70 mt-2">{f.a}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <div className="lg:col-span-1">
            <Reveal>
              <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-orange-500/20 to-orange-500/5 p-6">
                <div className="text-xl font-semibold mb-2">Pronto para começar?</div>
                <div className="text-white/80">Pague com segurança e receba seu site novo esta semana.</div>
                <a href={STRIPE_CHECKOUT_URL} className="mt-4 inline-flex items-center gap-2 rounded-xl bg-orange-500/90 hover:bg-orange-500 px-5 py-3 font-semibold">
                  Comprar agora <ArrowRight size={18} />
                </a>
                <div className="mt-4 text-white/70 text-sm flex items-start gap-2"><MessageCircle size={16}/> Suporte no WhatsApp após a compra.</div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* RODAPÉ */}
      <footer className="relative z-20 px-6 pb-10 text-center text-white/60">
        © {new Date().getFullYear()} Sua Agência — Todos os direitos reservados.
      </footer>
    </div>
  );
}

// ===== COMPONENTES AUXILIARES =====
function Card({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur hover:bg-white/10 transition will-change-transform">
      <div className="mb-3 opacity-80">{icon}</div>
      <div className="text-xl font-semibold">{title}</div>
      <div className="mt-2 text-white/70">{desc}</div>
    </div>
  );
}

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true, margin: "-100px" }}
    >
      {children}
    </motion.div>
  );
}

function Tilt({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current!;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const rx = ((y / rect.height) - 0.5) * -10;
      const ry = ((x / rect.width) - 0.5) * 10;
      el.style.transform = `perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(0)`;
    };
    const onLeave = () => {
      el.style.transform = "perspective(800px) rotateX(0deg) rotateY(0deg)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}

function Floaty({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function ParticlesOverlay() {
  // simples overlay de partículas em CSS (sem canvas extra)
  return (
    <div className="pointer-events-none absolute inset-0 z-10 [mask-image:radial-gradient(60%_60%_at_50%_35%,#000_60%,transparent)]">
      <div className="absolute -inset-[200px] opacity-20 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px] animate-[pulse_6s_ease-in-out_infinite]" />
    </div>
  );
}

function ThreeBackground() {
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animationRef = useRef<number | null>(null);

  // State de interação
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  const { scene, camera, group } = useMemo(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, 1, 0.1, 300);
    camera.position.set(0, 0, 28);

    const group = new THREE.Group();

    // Torus knot principal
    const knotGeo = new THREE.TorusKnotGeometry(8, 2.1, 260, 36);
    const knotMat = new THREE.MeshPhysicalMaterial({
      color: 0xff7a1a,
      metalness: 0.5,
      roughness: 0.25,
      transparent: true,
      opacity: 0.9,
      clearcoat: 0.6,
      emissive: new THREE.Color(0x140800),
    });
    const knot = new THREE.Mesh(knotGeo, knotMat);
    group.add(knot);

    // Orbit de “cards” que lembram telas de sites
    const panelGeo = new THREE.PlaneGeometry(6, 4, 1, 1);
    const panelMat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.08 });
    const ring = new THREE.Group();
    for (let i = 0; i < 10; i++) {
      const p = new THREE.Mesh(panelGeo, panelMat.clone());
      const angle = (i / 10) * Math.PI * 2;
      p.position.set(Math.cos(angle) * 16, Math.sin(angle) * 6, Math.sin(angle) * 10);
      p.lookAt(0, 0, 0);
      ring.add(p);
    }
    group.add(ring);

    // Partículas
    const starGeo = new THREE.BufferGeometry();
    const starCount = 600;
    const positions = new Float32Array(starCount * 3);
    for (let i = 0; i < starCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 180;
    }
    starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.6, color: 0xffffff, transparent: true, opacity: 0.55 });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    const light1 = new THREE.PointLight(0xffffff, 36, 200);
    light1.position.set(30, 30, 30);
    const light2 = new THREE.PointLight(0xff6a00, 24, 200);
    light2.position.set(-30, -10, 10);
    const ambient = new THREE.AmbientLight(0xffffff, 0.18);

    scene.add(group, light1, light2, ambient);
    scene.fog = new THREE.FogExp2(new THREE.Color(0x090909), 0.02);
    scene.background = null;

    return { scene, camera, group };
  }, []);

  useEffect(() => {
    const mount = mountRef.current!;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    rendererRef.current = renderer;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const onResize = () => {
      const w = mount.clientWidth || window.innerWidth;
      const h = mount.clientHeight || window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    const onMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const onScroll = () => {
      scrollY.current = window.scrollY;
    };

    onResize();
    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll);

    const renderLoop = () => {
      const t = performance.now() * 0.0004;

      // Parallax pelo mouse
      camera.position.x += (mouse.current.x * 2 - camera.position.x) * 0.02;
      camera.position.y += (mouse.current.y * 1.5 - camera.position.y) * 0.02;

      // Scroll controla leve zoom e rotação
      const targetZ = 28 + Math.sin(scrollY.current * 0.001) * 2;
      camera.position.z += (targetZ - camera.position.z) * 0.02;
      group.rotation.x = Math.sin(t) * 0.2 + scrollY.current * 0.0002;
      group.rotation.y = Math.cos(t) * 0.3 + scrollY.current * 0.0003;

      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(renderLoop);
    };

    renderLoop();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, [camera, scene, group]);

  return (
    <div ref={mountRef} className="pointer-events-none fixed inset-0 -z-0" />
  );
}
