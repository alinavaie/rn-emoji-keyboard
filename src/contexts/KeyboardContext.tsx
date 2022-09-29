import * as React from 'react'
import type { TextStyle, ViewStyle } from 'react-native'
import { en } from 'rn-emoji-keyboard'
import {
  CategoryTranslation,
  EmojiType,
  CategoryTypes,
  CategoryPosition,
  EmojisByCategory,
  JsonEmoji,
  EmojiTonesData,
  EmojiSizes,
  CATEGORIES,
} from '../types'
import type { RecursivePartial } from '../utils/deepMerge'

export type OnEmojiSelected = (emoji: EmojiType) => void

export type Styles = {
  container: ViewStyle
  header: TextStyle
  knob: ViewStyle
  category: {
    container: ViewStyle
    icon: TextStyle
  }
  searchBar: {
    container: ViewStyle
    text: TextStyle
  }
}

export type Theme = {
  backdrop: string
  knob: string
  container: string
  header: string
  skinTonesContainer: string
  category: {
    icon: string
    iconActive: string
    container: string
    containerActive: string
  }
  search: {
    background: string
    text: string
    placeholder: string
    icon: string
  }
}

export type KeyboardProps = {
  open: boolean
  onClose: () => void
  onEmojiSelected: OnEmojiSelected
  emojiSize?: number
  expandable?: boolean
  hideHeader?: boolean
  defaultHeight?: number | string
  expandedHeight?: number | string
  onCategoryChangeFailed?: (info: {
    index: number
    highestMeasuredFrameIndex: number
    averageItemLength: number
  }) => void
  translation: CategoryTranslation | undefined
  disabledCategories?: CategoryTypes[]
  enableRecentlyUsed?: boolean
  categoryPosition?: CategoryPosition
  enableSearchBar?: boolean
  categoryOrder?: CategoryTypes[]
  onRequestClose?: () => void
  disableSafeArea?: boolean
  allowMultipleSelections?: boolean
  theme?: RecursivePartial<Theme>
  styles?: RecursivePartial<Styles>
}
export type ContextValues = {
  activeCategoryIndex: number
  setActiveCategoryIndex: (index: number) => void
  numberOfColumns: number
  width: number
  searchPhrase: string
  setSearchPhrase: (phrase: string) => void
  renderList: EmojisByCategory[]
  isToneSelectorOpened: boolean
  clearEmojiTonesData: () => void
  generateEmojiTones: (emoji: JsonEmoji, emojiIndex: number, emojiSizes: EmojiSizes) => void
  emojiTonesData: EmojiTonesData
}

export const emptyStyles: Styles = {
  container: {},
  header: {},
  category: {
    icon: {},
    container: {},
  },
  searchBar: {
    container: {},
    text: {},
  },
  knob: {},
}
export const defaultTheme: Theme = {
  backdrop: '#00000055',
  knob: '#ffffff',
  container: '#ffffff',
  header: '#00000099',
  skinTonesContainer: '#e3dbcd',
  category: {
    icon: '#000000',
    iconActive: '#005b96',
    container: '#e3dbcd',
    containerActive: '#ffffff',
  },
  search: {
    text: '#000000cc',
    placeholder: '#00000055',
    icon: '#00000055',
    background: '#00000011',
  },
}

export const defaultKeyboardContext: Required<KeyboardProps> & { theme: Theme; styles: Styles } = {
  open: false,
  onClose: () => {},
  onEmojiSelected: (_emoji: EmojiType) => {},
  emojiSize: 28,
  expandable: true,
  hideHeader: false,
  defaultHeight: '40%',
  expandedHeight: '80%',
  onCategoryChangeFailed: (info) => {
    console.warn(info)
  },
  translation: en ? en : undefined,
  disabledCategories: [],
  enableRecentlyUsed: false,
  categoryPosition: 'floating',
  enableSearchBar: false,
  categoryOrder: [...CATEGORIES],
  onRequestClose: () => {},
  disableSafeArea: false,
  allowMultipleSelections: false,
  theme: defaultTheme,
  styles: emptyStyles,
}

export const defaultKeyboardValues: ContextValues = {
  activeCategoryIndex: 0,
  setActiveCategoryIndex: () => {},
  numberOfColumns: 5,
  width: 0,
  searchPhrase: '',
  setSearchPhrase: (_phrase: string) => {},
  renderList: [],
  isToneSelectorOpened: false,
  clearEmojiTonesData: () => {},
  generateEmojiTones: (_emoji) => {},
  emojiTonesData: {
    emojis: [],
    position: {
      x: 0,
      y: 0,
    },
    funnelXPosition: 0,
  },
}

export const KeyboardContext = React.createContext<
  Required<KeyboardProps> & ContextValues & { theme: Theme; styles: Styles }
>({
  ...defaultKeyboardContext,
  ...defaultKeyboardValues,
})
