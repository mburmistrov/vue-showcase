import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const pluralizationRules = {
  ru: function(choice, choicesLength) {
    if (choice === 0) {
      return 0
    }

    const teen = choice > 10 && choice < 20
    const endsWithOne = choice % 10 === 1

    if (choicesLength < 4) {
      return (!teen && endsWithOne) ? 1 : 2
    }
    if (!teen && endsWithOne) {
      return 1
    }
    if (!teen && choice % 10 >= 2 && choice % 10 <= 4) {
      return 2
    }

    return (choicesLength < 4) ? 2 : 3
  }
}

const messages = {
  ru: {
    app: {
      starterChecklistToggle: 'Показать/скрыть чеклист',
      imitateTextSearch: 'Имитировать поиск по тексту'
    },
    starterChecklist: {
      header: 'Знакомство с сервисом 📚',
      congrats: 'Вы выполнили все шаги, круто 🤟',
      categories: {
        search: 'Поиск креативов',
        filter: 'Фильтры',
        analytics: 'Аналитика креативов',
        content: 'Контент',
        apps: 'Приложения',
        other: 'Другое'
      },
      items: {
        searchByText: 'Попробуйте поискать по тексту',
        searchByApp: 'Попробуйте поискать по iOS или Android приложению',
        viewAggregateMediaDuplicatesMode: 'Посмотрите поиск по самым копируемым креативам (понадобится полный доступ)',
        filterByDate: 'Воспользуйтесь фильтром по дате',
        filterByBusinessPage: 'Воспользуйтесь фильтром по странице',
        filterByFormat: 'Воспользуйтесь фильтром по формату',
        filterByRedirects: 'Воспользуйтесь фильтром по ссылке и редиректам',
        viewCreativesAnalytics: 'Посмотрите аналитику запроса',
        downloadBannerMedia: 'Скачайте изображение или видео любого креатива',
        downloadBannerArchive: 'Скачайте архив с любом креативом',
        visitAppsPage: 'Посмотрите страницу Приложения',
        expandApp: 'Раскройте детальную информацию о любом приложении',
        visitParsingDemandsPage: 'Узнайте о добавлении страниц на отслеживание в разделе Запросить креативы',
        visitReferralDashboardPage: 'Узнайте о реферральной программе в Кабинете партнера'
      }
    }
  }
}

export const i18n = new VueI18n({
  locale: 'ru',
  messages,
  pluralizationRules
})
