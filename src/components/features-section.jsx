import { cn } from '@/lib/utils'
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconRouteAltLeft,
  IconTerminal2,
} from '@tabler/icons-react'

export default function FeaturesSection() {
  const features = [
    {
      title: 'Real-time Skin Condition Prediction',
      description:
        'Get accurate predictions of your skin condition in real-time by simply uploading a photo.',
      icon: <IconCloud />,
    },
    {
      title: 'Personalized Treatment Suggestions',
      description:
        'Based on your skin condition, receive personalized treatment suggestions and advice.',
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: 'Quick and Easy Image Upload',
      description:
        'Upload images effortlessly to get immediate predictions without any hassle.',
      icon: <IconTerminal2 />,
    },
    {
      title: 'Comprehensive Skin Analysis',
      description:
        'Get a detailed analysis of your skin condition, including severity levels and possible causes.',
      icon: <IconCurrencyDollar />,
    },
    {
      title: 'Consultation with Dermatologists',
      description:
        'In case of severe conditions, get in touch with a professional dermatologist through the app.',
      icon: <IconHeart />,
    },
    {
      title: "Track Your Skin's Progress",
      description:
        'Monitor your skin’s progress over time and see how your skin condition has improved or worsened.',
      icon: <IconRouteAltLeft />,
    },
    {
      title: 'Multi-Language Support',
      description:
        'Get skin condition predictions and suggestions in multiple languages, making it accessible globally.',
      icon: <IconCloud />,
    },
    {
      title: 'Instant Notifications',
      description:
        'Receive instant notifications when a new skin condition is detected or your skin’s condition changes.',
      icon: <IconEaseInOut />,
    },
  ]

  return (
    <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 py-10 md:grid-cols-2 lg:grid-cols-4">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  )
}
const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        'group/feature relative flex flex-col py-10 lg:border-r dark:border-neutral-800',
        (index === 0 || index === 4) && 'lg:border-l dark:border-neutral-800',
        index < 4 && 'lg:border-b dark:border-neutral-800',
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 h-full w-full opacity-0 transition duration-200 group-hover/feature:opacity-100',
          // Apply radial gradient only on hover
        )}
      />
      <div className="relative z-10 mb-4 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="relative z-10 mb-2 px-10 text-lg font-bold">
        <div className="absolute inset-y-0 left-0 h-6 w-1 origin-center rounded-tr-full rounded-br-full bg-neutral-300 transition-all duration-200 group-hover/feature:h-8 group-hover/feature:bg-blue-500 dark:bg-neutral-700" />
        <span className="inline-block text-black transition duration-200 group-hover/feature:translate-x-2">
          {title}
        </span>
      </div>
      <p className="relative z-10 max-w-xs px-10 text-sm text-gray-800">
        {description}
      </p>
    </div>
  )
}
