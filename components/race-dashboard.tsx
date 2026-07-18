"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  Activity,
  ArrowUpRight,
  CalendarDays,
  Database,
  Flag,
  Gauge,
  Languages,
  MapPin,
  TimerReset,
  Zap,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  drivers,
  featuredDrivers,
  session,
  type Driver,
  type PacePoint,
} from "@/lib/race-data";

type Locale = "en" | "fr";
type Metric = "bestLap" | "averageLap" | "topSpeed";

const translations = {
  en: {
    skip: "Skip to dashboard",
    homeLabel: "Pitwall dashboard home",
    circuitGraphic: "Abstract outline of Yas Marina Circuit",
    brandSub: "F1 data lab",
    navOverview: "Race analysis",
    sourceStatus: "Verified OpenF1 snapshot",
    langLabel: "Choose display language",
    eyebrow: "2025 season finale / Race 24",
    titleLineOne: "Race pace,",
    titleLineTwo: "decoded.",
    intro:
      "Explore how the leaders built their pace across 58 laps, then compare the field on the metrics that mattered at Yas Marina.",
    event: "Abu Dhabi Grand Prix",
    race: "Race",
    location: "Yas Marina Circuit",
    selectedDriver: "Selected driver",
    fastestLap: "Fastest lap",
    topSpeed: "Top speed",
    paceGap: "Pace gap",
    toBenchmark: "to fastest lap",
    laps: "Race laps",
    chartOneKicker: "01 / Pace trace",
    chartOneTitle: "How the pace developed",
    chartOneDescription:
      "Race lap time sampled every five laps. Lower on the chart means faster.",
    chooseDriver: "Choose a driver for the pace chart",
    lap: "Lap",
    lapTime: "Lap time",
    seconds: "Seconds",
    chartOneSummary: "Pace trend for",
    chartTwoKicker: "02 / Field comparison",
    chartTwoTitle: "Where the time was found",
    chartTwoDescription:
      "Compare eight drivers. Switch the measure to reveal a different race story.",
    chooseMetric: "Choose a metric for the comparison chart",
    bestLap: "Best lap",
    averageLap: "Average lap",
    speedTrap: "Top speed",
    faster: "Faster",
    chartTwoSummary: "Driver comparison by",
    readout: "Race readout",
    insightReference:
      "set the race-lap benchmark and stayed sharp through the final stint.",
    insightChasing: "finished",
    insightChasingEnd:
      "off the benchmark, showing how little separated the quickest laps.",
    designNoteTitle: "How to read this dashboard",
    designNote:
      "Pit-out laps, missing times and laps above 110 seconds are excluded. The pace trace is sampled at five-lap intervals to keep the trend clear.",
    source: "Data source",
    sourceLink: "OpenF1 API — session 9839",
    sourceDetail:
      "Historical race data. OpenF1 is unofficial and is not associated with Formula 1 companies.",
    footer: "Built for informed race fans.",
    english: "English",
    french: "Français",
  },
  fr: {
    skip: "Aller au tableau de bord",
    homeLabel: "Accueil du tableau de bord Pitwall",
    circuitGraphic: "Tracé abstrait du circuit de Yas Marina",
    brandSub: "Laboratoire de données F1",
    navOverview: "Analyse de course",
    sourceStatus: "Instantané OpenF1 vérifié",
    langLabel: "Choisir la langue d'affichage",
    eyebrow: "Finale 2025 / Course 24",
    titleLineOne: "Le rythme de course,",
    titleLineTwo: "décodé.",
    intro:
      "Explorez comment les meneurs ont construit leur rythme sur 58 tours, puis comparez le peloton selon les mesures clés à Yas Marina.",
    event: "Grand Prix d'Abou Dabi",
    race: "Course",
    location: "Circuit de Yas Marina",
    selectedDriver: "Pilote sélectionné",
    fastestLap: "Tour le plus rapide",
    topSpeed: "Vitesse maximale",
    paceGap: "Écart de rythme",
    toBenchmark: "du meilleur tour",
    laps: "Tours de course",
    chartOneKicker: "01 / Trace du rythme",
    chartOneTitle: "L'évolution du rythme",
    chartOneDescription:
      "Temps au tour échantillonné tous les cinq tours. Plus bas signifie plus rapide.",
    chooseDriver: "Choisir un pilote pour le graphique du rythme",
    lap: "Tour",
    lapTime: "Temps au tour",
    seconds: "Secondes",
    chartOneSummary: "Tendance du rythme de",
    chartTwoKicker: "02 / Comparaison du peloton",
    chartTwoTitle: "Où le temps a été gagné",
    chartTwoDescription:
      "Comparez huit pilotes. Changez la mesure pour révéler une autre lecture de la course.",
    chooseMetric: "Choisir une mesure pour le graphique comparatif",
    bestLap: "Meilleur tour",
    averageLap: "Tour moyen",
    speedTrap: "Vitesse maximale",
    faster: "Plus rapide",
    chartTwoSummary: "Comparaison des pilotes selon",
    readout: "Lecture de course",
    insightReference:
      "a établi la référence et a conservé un rythme soutenu dans le dernier relais.",
    insightChasing: "a terminé à",
    insightChasingEnd:
      "de la référence, preuve du faible écart entre les tours les plus rapides.",
    designNoteTitle: "Comment lire ce tableau de bord",
    designNote:
      "Les tours de sortie, les temps manquants et les tours de plus de 110 secondes sont exclus. La trace du rythme est échantillonnée tous les cinq tours pour clarifier la tendance.",
    source: "Source des données",
    sourceLink: "API OpenF1 — session 9839",
    sourceDetail:
      "Données historiques de course. OpenF1 est non officiel et n'est pas associé aux entreprises de Formule 1.",
    footer: "Conçu pour les passionnés de course.",
    english: "English",
    french: "Français",
  },
} as const;

const metricOptions: Metric[] = ["bestLap", "averageLap", "topSpeed"];

function formatLapTime(seconds: number, locale: Locale) {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds - minutes * 60;
  const formatted = new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    minimumIntegerDigits: 2,
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(remaining);
  return `${minutes}:${formatted}`;
}

function formatDecimal(value: number, locale: Locale, digits = 3) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    minimumFractionDigits: digits,
    maximumFractionDigits: digits,
  }).format(value);
}

function formatDate(locale: Locale) {
  return new Intl.DateTimeFormat(locale === "fr" ? "fr-CA" : "en-CA", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(session.date));
}

type PaceTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: Array<{ value?: number; payload?: PacePoint }>;
  locale: Locale;
};

function PaceTooltip({ active, label, payload, locale }: PaceTooltipProps) {
  if (!active || !payload?.[0]?.value) return null;
  const t = translations[locale];
  return (
    <div className="chart-tooltip">
      <span className="chart-tooltip-label">
        {t.lap} {label}
      </span>
      <strong>{formatLapTime(payload[0].value, locale)}</strong>
    </div>
  );
}

type MetricTooltipProps = {
  active?: boolean;
  payload?: Array<{ value?: number; payload?: Driver }>;
  locale: Locale;
  metric: Metric;
};

function MetricTooltip({ active, payload, locale, metric }: MetricTooltipProps) {
  if (!active || !payload?.[0]?.payload || payload[0].value === undefined) return null;
  const driver = payload[0].payload;
  const value = payload[0].value;
  return (
    <div className="chart-tooltip min-w-36">
      <span className="chart-tooltip-label">
        {driver.name} / {driver.team}
      </span>
      <strong>
        {metric === "topSpeed"
          ? `${formatDecimal(value, locale, 0)} km/h`
          : formatLapTime(value, locale)}
      </strong>
    </div>
  );
}

function SegmentControl({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div
      role="group"
      aria-label={label}
      className="inline-flex max-w-full items-center gap-1 overflow-x-auto rounded-lg border border-border bg-secondary p-1"
    >
      {children}
    </div>
  );
}

function Stat({
  icon: Icon,
  label,
  value,
  detail,
}: {
  icon: typeof Gauge;
  label: string;
  value: string;
  detail?: string;
}) {
  return (
    <div className="stat-block">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon aria-hidden="true" className="size-4" />
        <span className="text-[0.6875rem] font-bold uppercase tracking-[0.12em]">{label}</span>
      </div>
      <div className="mt-3 font-mono text-[clamp(1.35rem,2.5vw,2rem)] font-medium tracking-[-0.04em]">
        {value}
      </div>
      {detail ? <div className="mt-1 text-xs text-muted-foreground">{detail}</div> : null}
    </div>
  );
}

export function RaceDashboard() {
  const [locale, setLocale] = useState<Locale>("en");
  const [selectedDriverNumber, setSelectedDriverNumber] = useState(4);
  const [metric, setMetric] = useState<Metric>("bestLap");
  const t = translations[locale];
  const selectedDriver =
    drivers.find((driver) => driver.number === selectedDriverNumber) ?? drivers[2];

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  const paceDomain = useMemo(() => {
    let minimum = Number.POSITIVE_INFINITY;
    let maximum = Number.NEGATIVE_INFINITY;
    for (const point of selectedDriver.pace) {
      minimum = Math.min(minimum, point.time);
      maximum = Math.max(maximum, point.time);
    }
    return [Math.floor(minimum - 0.4), Math.ceil(maximum + 0.4)];
  }, [selectedDriver]);

  const comparisonData = useMemo(
    () =>
      [...drivers].sort((a, b) =>
        metric === "topSpeed" ? b[metric] - a[metric] : a[metric] - b[metric],
      ),
    [metric],
  );

  const fastestOverall = drivers[0].bestLap;
  const deltaToFastest = selectedDriver.bestLap - fastestOverall;
  const metricLabel =
    metric === "bestLap" ? t.bestLap : metric === "averageLap" ? t.averageLap : t.speedTrap;

  return (
    <>
      <a href="#dashboard" className="skip-link">
        {t.skip}
      </a>
      <header className="border-b border-border bg-background">
        <div className="page-shell flex min-h-20 items-center justify-between gap-4 py-4">
          <a href="#dashboard" className="group flex items-center gap-3" aria-label={t.homeLabel}>
            <span className="motorsport-mark" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>
              <span className="block text-sm font-black tracking-[-0.03em]">PITWALL</span>
              <span className="block text-[0.625rem] font-bold uppercase tracking-[0.16em] text-muted-foreground">
                {t.brandSub}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-2 text-xs font-medium text-muted-foreground md:flex">
            <Activity aria-hidden="true" className="size-4 text-primary" />
            <span>{t.navOverview}</span>
            <span aria-hidden="true" className="mx-1 text-border">/</span>
            <Database aria-hidden="true" className="size-3.5" />
            <span>{t.sourceStatus}</span>
          </div>

          <div
            role="group"
            aria-label={t.langLabel}
            className="flex items-center rounded-lg border border-border bg-card p-1"
          >
            <Languages aria-hidden="true" className="mx-2 size-4 text-muted-foreground" />
            <Button
              size="sm"
              variant={locale === "en" ? "inverse" : "ghost"}
              aria-pressed={locale === "en"}
              onClick={() => setLocale("en")}
              className="h-7 px-2.5"
            >
              <span className="sm:hidden">EN</span>
              <span className="hidden sm:inline">{t.english}</span>
            </Button>
            <Button
              size="sm"
              variant={locale === "fr" ? "inverse" : "ghost"}
              aria-pressed={locale === "fr"}
              onClick={() => setLocale("fr")}
              className="h-7 px-2.5"
            >
              <span className="sm:hidden">FR</span>
              <span className="hidden sm:inline">{t.french}</span>
            </Button>
          </div>
        </div>
      </header>

      <main id="dashboard">
        <section className="hero-section overflow-hidden border-b border-border">
          <div className="page-shell grid gap-10 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center lg:py-16">
            <div>
              <Badge variant="outline" className="mb-6 bg-transparent">
                <Flag aria-hidden="true" className="size-3" />
                {t.eyebrow}
              </Badge>
              <h1 className="max-w-4xl text-balance text-[clamp(3.25rem,8vw,7rem)] font-black leading-[0.82] tracking-[-0.075em]">
                {t.titleLineOne}
                <span className="block text-primary">{t.titleLineTwo}</span>
              </h1>
              <p className="mt-7 max-w-2xl text-pretty text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {t.intro}
              </p>
              <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm">
                <div className="flex items-center gap-2 font-semibold">
                  <CalendarDays aria-hidden="true" className="size-4 text-primary" />
                  {formatDate(locale)}
                </div>
                <div className="flex items-center gap-2 font-semibold">
                  <MapPin aria-hidden="true" className="size-4 text-primary" />
                  {t.location}
                </div>
                <Badge variant="muted">{t.race}</Badge>
              </div>
            </div>

            <div className="track-panel relative min-h-[320px] overflow-hidden rounded-2xl bg-foreground p-7 text-background sm:p-9">
              <div className="relative z-10 flex items-start justify-between gap-4">
                <div>
                  <span className="text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-background/55">
                    {t.event}
                  </span>
                  <p className="mt-2 max-w-[12rem] text-2xl font-bold tracking-[-0.04em]">
                    {t.location}
                  </p>
                </div>
                <span className="font-mono text-5xl font-medium text-primary">{session.laps}</span>
              </div>
              <div className="relative z-10 mt-5 h-[230px] overflow-hidden sm:h-[260px]">
                <Image
                  src="/yas.webp"
                  alt={t.circuitGraphic}
                  fill
                  priority
                  sizes="(max-width: 1024px) calc(100vw - 3rem), 34rem"
                  className="object-contain object-center mix-blend-lighten"
                />
              </div>
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-background/15 pt-5 text-xs">
                <span className="text-background/55">{t.laps}</span>
                <span className="font-mono">SESSION / {session.key}</span>
              </div>
              <span className="absolute -bottom-12 -right-3 font-mono text-[10rem] font-medium leading-none text-background/[0.035]">
                24
              </span>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-card/45">
          <div className="page-shell grid sm:grid-cols-2 lg:grid-cols-4">
            <Stat
              icon={Activity}
              label={t.selectedDriver}
              value={selectedDriver.shortName}
              detail={`${selectedDriver.name} / ${selectedDriver.team}`}
            />
            <Stat
              icon={TimerReset}
              label={t.fastestLap}
              value={formatLapTime(selectedDriver.bestLap, locale)}
              detail={`${t.lap} ${selectedDriver.bestLapNumber}`}
            />
            <Stat
              icon={Zap}
              label={t.topSpeed}
              value={formatDecimal(selectedDriver.topSpeed, locale, 0)}
              detail="km/h"
            />
            <Stat
              icon={Gauge}
              label={t.paceGap}
              value={`+${formatDecimal(deltaToFastest, locale)}`}
              detail={`${t.toBenchmark} / s`}
            />
          </div>
        </section>

        <div className="page-shell space-y-6 py-8 sm:py-12">
          <Card className="overflow-hidden">
            <CardHeader className="gap-5 border-b border-border lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <span className="section-kicker">{t.chartOneKicker}</span>
                <CardTitle className="mt-2 text-2xl sm:text-3xl">{t.chartOneTitle}</CardTitle>
                <CardDescription className="mt-2 max-w-xl">{t.chartOneDescription}</CardDescription>
              </div>
              <SegmentControl label={t.chooseDriver}>
                {featuredDrivers.map((driver) => (
                  <Button
                    key={driver.number}
                    size="sm"
                    variant={selectedDriverNumber === driver.number ? "inverse" : "ghost"}
                    aria-pressed={selectedDriverNumber === driver.number}
                    onClick={() => setSelectedDriverNumber(driver.number)}
                    className="min-w-12 font-mono"
                  >
                    {driver.shortName}
                  </Button>
                ))}
              </SegmentControl>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className="size-2.5 rounded-full ring-4 ring-secondary"
                    style={{ backgroundColor: selectedDriver.teamColor }}
                    aria-hidden="true"
                  />
                  <span className="text-sm font-semibold">{selectedDriver.name}</span>
                  <span className="text-xs text-muted-foreground">{selectedDriver.team}</span>
                </div>
                <span className="font-mono text-xs text-muted-foreground">{t.faster} ↓</span>
              </div>

              <figure
                role="img"
                aria-label={`${t.chartOneSummary} ${selectedDriver.name}`}
                className="h-[310px] w-full sm:h-[380px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={selectedDriver.pace}
                    margin={{ top: 14, right: 14, bottom: 8, left: -12 }}
                  >
                    <CartesianGrid
                      stroke="var(--chart-grid)"
                      strokeDasharray="2 5"
                      vertical={false}
                    />
                    <XAxis
                      dataKey="lap"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                      tickMargin={12}
                      label={{
                        value: t.lap,
                        position: "insideBottomRight",
                        offset: -4,
                        fill: "var(--muted-foreground)",
                        fontSize: 11,
                      }}
                    />
                    <YAxis
                      domain={paceDomain}
                      axisLine={false}
                      tickLine={false}
                      width={54}
                      tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                      tickFormatter={(value: number) => formatDecimal(value, locale, 1)}
                    />
                    <Tooltip
                      content={<PaceTooltip locale={locale} />}
                      cursor={{ stroke: "var(--border)", strokeDasharray: "3 3" }}
                    />
                    <ReferenceLine
                      y={selectedDriver.bestLap}
                      stroke="var(--primary)"
                      strokeDasharray="4 4"
                      strokeOpacity={0.45}
                    />
                    <Line
                      type="monotone"
                      dataKey="time"
                      stroke={selectedDriver.teamColor}
                      strokeWidth={3}
                      dot={false}
                      activeDot={{
                        r: 5,
                        fill: selectedDriver.teamColor,
                        stroke: "var(--card)",
                        strokeWidth: 3,
                      }}
                      isAnimationActive={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </figure>
              <p className="sr-only">
                {selectedDriver.pace
                  .map((point) => `${t.lap} ${point.lap}: ${formatLapTime(point.time, locale)}`)
                  .join("; ")}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-6 xl:grid-cols-[1.55fr_0.75fr]">
            <Card className="overflow-hidden">
              <CardHeader className="gap-5 border-b border-border">
                <div>
                  <span className="section-kicker">{t.chartTwoKicker}</span>
                  <CardTitle className="mt-2 text-2xl sm:text-3xl">{t.chartTwoTitle}</CardTitle>
                  <CardDescription className="mt-2 max-w-xl">{t.chartTwoDescription}</CardDescription>
                </div>
                <SegmentControl label={t.chooseMetric}>
                  {metricOptions.map((option) => {
                    const label =
                      option === "bestLap"
                        ? t.bestLap
                        : option === "averageLap"
                          ? t.averageLap
                          : t.speedTrap;
                    return (
                      <Button
                        key={option}
                        size="sm"
                        variant={metric === option ? "inverse" : "ghost"}
                        aria-pressed={metric === option}
                        onClick={() => setMetric(option)}
                      >
                        {label}
                      </Button>
                    );
                  })}
                </SegmentControl>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                  <span>{metricLabel}</span>
                  <span className="font-mono">
                    {metric === "topSpeed" ? "km/h" : t.seconds}
                  </span>
                </div>
                <figure
                  role="img"
                  aria-label={`${t.chartTwoSummary} ${metricLabel}`}
                  className="h-[440px] w-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={comparisonData}
                      layout="vertical"
                      margin={{ top: 8, right: 18, bottom: 12, left: 4 }}
                    >
                      <CartesianGrid
                        stroke="var(--chart-grid)"
                        strokeDasharray="2 5"
                        horizontal={false}
                      />
                      <XAxis
                        type="number"
                        domain={metric === "topSpeed" ? [300, 350] : [86, 91]}
                        axisLine={false}
                        tickLine={false}
                        tickMargin={10}
                        tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
                        tickFormatter={(value: number) =>
                          formatDecimal(value, locale, metric === "topSpeed" ? 0 : 1)
                        }
                      />
                      <YAxis
                        type="category"
                        dataKey="shortName"
                        axisLine={false}
                        tickLine={false}
                        width={44}
                        tick={{ fill: "var(--foreground)", fontSize: 11, fontWeight: 700 }}
                      />
                      <Tooltip
                        content={<MetricTooltip locale={locale} metric={metric} />}
                        cursor={{ fill: "var(--secondary)", opacity: 0.55 }}
                      />
                      <Bar
                        dataKey={metric}
                        radius={[0, 5, 5, 0]}
                        barSize={22}
                        isAnimationActive={false}
                      >
                        {comparisonData.map((driver) => (
                          <Cell
                            key={`${metric}-${driver.number}`}
                            fill={
                              driver.number === selectedDriver.number
                                ? "var(--primary)"
                                : "var(--chart-muted)"
                            }
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </figure>
                <p className="sr-only">
                  {comparisonData
                    .map((driver) => {
                      const value = driver[metric];
                      return `${driver.name}: ${
                        metric === "topSpeed"
                          ? `${formatDecimal(value, locale, 0)} km/h`
                          : formatLapTime(value, locale)
                      }`;
                    })
                    .join("; ")}
                </p>
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card className="overflow-hidden bg-foreground text-background">
                <CardHeader className="border-b border-background/15">
                  <span className="flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.13em] text-background/55">
                    <Activity aria-hidden="true" className="size-4 text-primary" />
                    {t.readout}
                  </span>
                  <CardTitle className="mt-4 text-3xl text-background">
                    {selectedDriver.name}
                  </CardTitle>
                  <CardDescription className="text-background/60">
                    {selectedDriver.team} / #{selectedDriver.number}
                  </CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-lg leading-8 text-background/88">
                    {selectedDriver.bestLap === fastestOverall ? (
                      <>
                        <strong className="text-primary">{selectedDriver.shortName}</strong>{" "}
                        {t.insightReference}
                      </>
                    ) : (
                      <>
                        <strong className="text-primary">{selectedDriver.shortName}</strong>{" "}
                        {t.insightChasing} <strong>{formatDecimal(deltaToFastest, locale)} s</strong>{" "}
                        {t.insightChasingEnd}
                      </>
                    )}
                  </p>
                  <div className="mt-8 grid grid-cols-2 gap-3 border-t border-background/15 pt-6">
                    <div>
                      <span className="block text-[0.625rem] font-bold uppercase tracking-[0.12em] text-background/45">
                        {t.bestLap}
                      </span>
                      <span className="mt-2 block font-mono text-lg">
                        {formatLapTime(selectedDriver.bestLap, locale)}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[0.625rem] font-bold uppercase tracking-[0.12em] text-background/45">
                        {t.averageLap}
                      </span>
                      <span className="mt-2 block font-mono text-lg">
                        {formatLapTime(selectedDriver.averageLap, locale)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Gauge aria-hidden="true" className="size-4 text-primary" />
                    {t.designNoteTitle}
                  </CardTitle>
                  <CardDescription className="pt-2">{t.designNote}</CardDescription>
                </CardHeader>
              </Card>

              <Card>
                <CardHeader>
                  <span className="section-kicker flex items-center gap-2">
                    <Database aria-hidden="true" className="size-4" />
                    {t.source}
                  </span>
                  <a
                    href="https://openf1.org/"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-2 font-semibold underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    {t.sourceLink}
                    <ArrowUpRight aria-hidden="true" className="size-4" />
                  </a>
                  <CardDescription className="pt-1">{t.sourceDetail}</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t border-border bg-foreground text-background">
        <div className="page-shell flex flex-col gap-4 py-7 text-xs text-background/55 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-bold tracking-[0.12em] text-background">PITWALL / 2025</span>
          <span>{t.footer}</span>
          <a
            href="https://openf1.org/docs/"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 transition-colors hover:text-background"
          >
            OPENF1.ORG
            <ArrowUpRight aria-hidden="true" className="size-3.5" />
          </a>
        </div>
      </footer>
    </>
  );
}
