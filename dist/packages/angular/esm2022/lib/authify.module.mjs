import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SignInComponent } from './signin.component';
import { SignUpComponent } from './signup.component';
import { UserProfileComponent } from './user-profile.component';
import { UserButtonComponent } from './user-button.component';
import { AuthifyService, AUTHIFY_CONFIG } from './authify.service';
import * as i0 from "@angular/core";
export class AuthifyModule {
    static forRoot(config) {
        return {
            ngModule: AuthifyModule,
            providers: [
                { provide: AUTHIFY_CONFIG, useValue: config },
                AuthifyService
            ]
        };
    }
    static ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
    static ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, declarations: [SignInComponent,
            SignUpComponent,
            UserProfileComponent,
            UserButtonComponent], imports: [CommonModule,
            FormsModule], exports: [SignInComponent,
            SignUpComponent,
            UserProfileComponent,
            UserButtonComponent] });
    static ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, imports: [CommonModule,
            FormsModule] });
}
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "17.3.12", ngImport: i0, type: AuthifyModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        SignInComponent,
                        SignUpComponent,
                        UserProfileComponent,
                        UserButtonComponent
                    ],
                    imports: [
                        CommonModule,
                        FormsModule
                    ],
                    exports: [
                        SignInComponent,
                        SignUpComponent,
                        UserProfileComponent,
                        UserButtonComponent
                    ]
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aGlmeS5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wYWNrYWdlcy9hbmd1bGFyL3NyYy9saWIvYXV0aGlmeS5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxlQUFlLENBQUM7QUFDOUQsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUM3QyxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDckQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxjQUFjLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7O0FBcUJuRSxNQUFNLE9BQU8sYUFBYTtJQUN0QixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQWtCO1FBQzdCLE9BQU87WUFDSCxRQUFRLEVBQUUsYUFBYTtZQUN2QixTQUFTLEVBQUU7Z0JBQ1AsRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUU7Z0JBQzdDLGNBQWM7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQzt3R0FUUSxhQUFhO3lHQUFiLGFBQWEsaUJBaEJsQixlQUFlO1lBQ2YsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixtQkFBbUIsYUFHbkIsWUFBWTtZQUNaLFdBQVcsYUFHWCxlQUFlO1lBQ2YsZUFBZTtZQUNmLG9CQUFvQjtZQUNwQixtQkFBbUI7eUdBR2QsYUFBYSxZQVZsQixZQUFZO1lBQ1osV0FBVzs7NEZBU04sYUFBYTtrQkFsQnpCLFFBQVE7bUJBQUM7b0JBQ04sWUFBWSxFQUFFO3dCQUNWLGVBQWU7d0JBQ2YsZUFBZTt3QkFDZixvQkFBb0I7d0JBQ3BCLG1CQUFtQjtxQkFDdEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osV0FBVztxQkFDZDtvQkFDRCxPQUFPLEVBQUU7d0JBQ0wsZUFBZTt3QkFDZixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsbUJBQW1CO3FCQUN0QjtpQkFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEZvcm1zTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBTaWduSW5Db21wb25lbnQgfSBmcm9tICcuL3NpZ25pbi5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBTaWduVXBDb21wb25lbnQgfSBmcm9tICcuL3NpZ251cC5jb21wb25lbnQnO1xyXG5pbXBvcnQgeyBVc2VyUHJvZmlsZUNvbXBvbmVudCB9IGZyb20gJy4vdXNlci1wcm9maWxlLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IFVzZXJCdXR0b25Db21wb25lbnQgfSBmcm9tICcuL3VzZXItYnV0dG9uLmNvbXBvbmVudCc7XHJcbmltcG9ydCB7IEF1dGhpZnlTZXJ2aWNlLCBBVVRISUZZX0NPTkZJRyB9IGZyb20gJy4vYXV0aGlmeS5zZXJ2aWNlJztcclxuaW1wb3J0IHsgQXV0aENvbmZpZyB9IGZyb20gJ0BhdXRoaWZ5L2NvcmUnO1xyXG5cclxuQE5nTW9kdWxlKHtcclxuICAgIGRlY2xhcmF0aW9uczogW1xyXG4gICAgICAgIFNpZ25JbkNvbXBvbmVudCxcclxuICAgICAgICBTaWduVXBDb21wb25lbnQsXHJcbiAgICAgICAgVXNlclByb2ZpbGVDb21wb25lbnQsXHJcbiAgICAgICAgVXNlckJ1dHRvbkNvbXBvbmVudFxyXG4gICAgXSxcclxuICAgIGltcG9ydHM6IFtcclxuICAgICAgICBDb21tb25Nb2R1bGUsXHJcbiAgICAgICAgRm9ybXNNb2R1bGVcclxuICAgIF0sXHJcbiAgICBleHBvcnRzOiBbXHJcbiAgICAgICAgU2lnbkluQ29tcG9uZW50LFxyXG4gICAgICAgIFNpZ25VcENvbXBvbmVudCxcclxuICAgICAgICBVc2VyUHJvZmlsZUNvbXBvbmVudCxcclxuICAgICAgICBVc2VyQnV0dG9uQ29tcG9uZW50XHJcbiAgICBdXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBBdXRoaWZ5TW9kdWxlIHtcclxuICAgIHN0YXRpYyBmb3JSb290KGNvbmZpZzogQXV0aENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QXV0aGlmeU1vZHVsZT4ge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIG5nTW9kdWxlOiBBdXRoaWZ5TW9kdWxlLFxyXG4gICAgICAgICAgICBwcm92aWRlcnM6IFtcclxuICAgICAgICAgICAgICAgIHsgcHJvdmlkZTogQVVUSElGWV9DT05GSUcsIHVzZVZhbHVlOiBjb25maWcgfSxcclxuICAgICAgICAgICAgICAgIEF1dGhpZnlTZXJ2aWNlXHJcbiAgICAgICAgICAgIF1cclxuICAgICAgICB9O1xyXG4gICAgfVxyXG59XHJcbiJdfQ==