import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { AboutMeComponent } from "./about-me/about-me.component";
import { GamePanelComponent } from "./game-panel/game-panel.component";

const appRoutes : Routes = [
    {
        path: "", redirectTo: "/game-panel", pathMatch: "full"
    },
    {
        path: "game-panel", component: GamePanelComponent
    },
    {
        path: "about-me", component: AboutMeComponent
    }
]

@NgModule(
    {
        imports: [RouterModule.forRoot(appRoutes)],
        exports: [RouterModule]
    }
)
export class AppRoutingModule {

}