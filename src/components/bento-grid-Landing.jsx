'use client'
import {
  TbHexagonNumber1,
  TbHexagonNumber2,
  TbHexagonNumber3,
  TbHexagonNumber4,
  TbHexagonNumber5,
  TbHexagonNumber6,
} from 'react-icons/tb'

import { BentoGrid, BentoGridItem } from './ui/bento-grid'

export default function BentoGridDemo() {
  return (
    <BentoGrid className="mx-auto max-w-4xl">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          icon={item.icon}
          className={i === 3 || i === 6 ? 'md:col-span-2' : ''}
        />
      ))}
    </BentoGrid>
  )
}
const Skeleton = () => (
  <></>
  //   <div className="flex h-full min-h-[6rem] w-full flex-1 rounded-xl bg-gradient-to-br from-neutral-900 to-neutral-800 dark:from-neutral-900 dark:to-neutral-800"></div>
)
const items = [
  {
    title: 'Upload Your Image',
    description:
      'Take a clear photo of your skin area that you want to analyze. Upload it here to get started',
    header: <Skeleton />,
    icon: <TbHexagonNumber1 className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: ' Wait for AI Analysis',
    description:
      'Our AI system will analyze your image in real-time, detecting any potential skin conditions.',
    header: <Skeleton />,
    icon: <TbHexagonNumber2 className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: 'Review Skin Condition Results',
    description:
      'Once the analysis is complete, view the detailed results of your skin condition, including severity levels and possible causes.',
    header: <Skeleton />,
    icon: <TbHexagonNumber3 className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: 'Get Personalized  Recommendations',
    description:
      'Receive customized suggestions for treatments based on your skin’s condition. These recommendations are tailored to improve your skin health.',
    header: <Skeleton />,
    icon: <TbHexagonNumber4 className="h-6 w-6 text-neutral-500" />,
  },
  {
    title: 'Track Your Skin’s Progress',
    description:
      'Monitor the progress of your skin over time. Upload new images periodically to compare changes and see how your skin is improving.',
    header: <Skeleton />,
    icon: <TbHexagonNumber5 className="h-6 w-6 text-neutral-500" />,
  },
]
