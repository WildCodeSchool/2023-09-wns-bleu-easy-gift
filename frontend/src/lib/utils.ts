import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function getConstraints(data: any) {
    return Array.isArray(data)
        ? data.map((item: any) => {
              const constraintsKey = Object.values(item.constraints)[0]
              const propertyName = item.property
              return {
                  [propertyName]: constraintsKey,
              }
          })
        : null
}
