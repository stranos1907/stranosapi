import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaseComponent } from './views/layout/base/base.component';
import { AuthGuard } from './core/guard/auth.guard';
import { ErrorPageComponent } from './views/pages/error-page/error-page.component';


const routes: Routes = [
  { path:'auth', loadChildren: () => import('./views/pages/auth/auth.module').then(m => m.AuthModule) },
  {
    path: '',
    component: BaseComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/pages/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'apps',
        loadChildren: () => import('./views/pages/apps/apps.module').then(m => m.AppsModule)
      },
      {
        path: 'ui-components',
        loadChildren: () => import('./views/pages/ui-components/ui-components.module').then(m => m.UiComponentsModule)
      },
      {
        path: 'advanced-ui',
        loadChildren: () => import('./views/pages/advanced-ui/advanced-ui.module').then(m => m.AdvancedUiModule)
      },
      {
        path: 'form-elements',
        loadChildren: () => import('./views/pages/form-elements/form-elements.module').then(m => m.FormElementsModule)
      },
      {
        path: 'advanced-form-elements',
        loadChildren: () => import('./views/pages/advanced-form-elements/advanced-form-elements.module').then(m => m.AdvancedFormElementsModule)
      },
      {
        path: 'charts-graphs',
        loadChildren: () => import('./views/pages/charts-graphs/charts-graphs.module').then(m => m.ChartsGraphsModule)
      },
      {
        path: 'tables',
        loadChildren: () => import('./views/pages/tables/tables.module').then(m => m.TablesModule)
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/pages/icons/icons.module').then(m => m.IconsModule)
      },
      {
        path: 'general',
        loadChildren: () => import('./views/pages/general/general.module').then(m => m.GeneralModule)
      },
      {
        path: 'user',
        loadChildren: () => import('./views/pages/user/user.module').then(m => m.UserModule)
      },
      {
        path: 'profile',
        loadChildren: () => import('./views/pages/profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'slider',
        loadChildren: () => import('./views/pages/slider/slider.module').then(m => m.SliderModule)
      },
      {
        path: 'vipslider',
        loadChildren: () => import('./views/pages/vipslider/vipslider.module').then(m => m.VipSliderModule)
      },

      {
        path: 'jobs',
        loadChildren: () => import('./views/pages/jobs/jobs.module').then(m => m.JobsModule)
      },

      {
        path: 'hobby',
        loadChildren: () => import('./views/pages/hobby/hobby.module').then(m => m.HobbyModule)
      },
      {
        path: 'package',
        loadChildren: () => import('./views/pages/package/package.module').then(m => m.PackageModule)
      },

      {
        path: 'vippackage',
        loadChildren: () => import('./views/pages/vippackage/vippackage.module').then(m => m.VipPackageModule)
      },
      {
        path: 'payment',
        loadChildren: () => import('./views/pages/payment/payment.module').then(m => m.PaymentModule)
      },
      {
        path: 'gift',
        loadChildren: () => import('./views/pages/gift/gift.module').then(m => m.GiftModule)
      },
      {
        path: 'message',
        loadChildren: () => import('./views/pages/message/message.module').then(m => m.MessageModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./views/pages/notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'options',
        loadChildren: () => import('./views/pages/options/options.module').then(m => m.OptionsModule)
      },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      // { path: '**', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },
  {
    path: 'error',
    component: ErrorPageComponent,
    data: {
      'type': 404,
      'title': 'Page Not Found',
      'desc': 'Oopps!! The page you were looking for doesn\'t exist.'
    }
  },
  {
    path: 'error/:type',
    component: ErrorPageComponent
  },
  { path: '**', redirectTo: 'error', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' ,useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
