import styles from './not-found.module.css'

import { ReactElement } from 'react'
import { Link } from 'react-router-dom'
import cn from 'classnames'

import { t } from '@i18n'
import { Routes } from '@router/routes.enum'
import { Button } from '@ui/button'
import { Icon } from '@ui/icon'
import { Header } from '@components/header'

export const NotFoundPage = (): ReactElement => {
  return (
    <div className={cn(styles.notFound)}>
      <Header />
      <div className={cn(styles.notFound__wrapper)}>
        <h1 className={cn(styles.notFound__errorStatus)}>404</h1>
        <h2 className={cn(styles.notFound__title)}>
          {t('notFound.somethingIsWrong')}
        </h2>
        <span className={cn(styles.notFound__info)}>{t('notFound.info')}</span>
        <Link to={Routes.Root}>
          <Button
            text={t('error.getBack')}
            className="mt-3"
            prepend={<Icon name="Arrow" />}
          />
        </Link>
      </div>
    </div>
  )
}
