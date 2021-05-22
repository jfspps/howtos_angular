import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AngularbindingComponent } from './angulardbpage/angularbinding/angularbinding.component';
import { AngulardbpageComponent } from './angulardbpage/angulardbpage.component';
import { AngulardemoComponent } from './angulardbpage/angulardemo/angulardemo.component';
import { AngulardirectivesComponent } from './angulardbpage/angulardirectives/angulardirectives.component';
import { AngularroutingComponent } from './angulardbpage/angularrouting/angularrouting.component';
import { AngularservicesComponent } from './angulardbpage/angularservices/angularservices.component';
import { SqlnotesComponent } from './angulardbpage/sqlnotes/sqlnotes.component';
import { AdtalgorithmspageComponent } from './cpythonpage/adtalgorithmspage/adtalgorithmspage.component';
import { BashslideComponent } from './cpythonpage/bashslide/bashslide.component';
import { ComputationspageComponent } from './cpythonpage/computationspage/computationspage.component';
import { CpythonpageComponent } from './cpythonpage/cpythonpage.component';
import { HomeComponent } from './home/home.component';
import { AndroidbuttonpageComponent } from './androidJavaFX/androidbuttonpage/androidbuttonpage.component';
import { AndroidcalculatorpageComponent } from './androidJavaFX/androidcalculatorpage/androidcalculatorpage.component';
import { AndroidcontentproviderspageComponent } from './androidJavaFX/androidcontentproviderspage/androidcontentproviderspage.component';
import { AndroidflickrpageComponent } from './androidJavaFX/androidflickrpage/androidflickrpage.component';
import { AndroidrssreaderpageComponent } from './androidJavaFX/androidrssreaderpage/androidrssreaderpage.component';
import { AndroidtasktimerpageComponent } from './androidJavaFX/androidtasktimerpage/androidtasktimerpage.component';
import { AndroidyoutubepageComponent } from './androidJavaFX/androidyoutubepage/androidyoutubepage.component';
import { JavaclientserverpageComponent } from './javapage/javaclientserverpage/javaclientserverpage.component';
import { JavadesignpatternspageComponent } from './javapage/javadesignpatternspage/javadesignpatternspage.component';
import { JavafxgradleComponent } from './androidJavaFX/javafxgradle/javafxgradle.component';
import { JavapageComponent } from './javapage/javapage.component';
import { JavathreadspageComponent } from './javapage/javathreadspage/javathreadspage.component';
import { SpringmvcpageComponent } from './spring-jakarta/springmvcpage/springmvcpage.component';
import { SpringreactivepageComponent } from './spring-jakarta/springreactivepage/springreactivepage.component';
import { SpringrestapipageComponent } from './spring-jakarta/springrestapipage/springrestapipage.component';
import { SpringsecuritypageComponent } from './spring-jakarta/springsecuritypage/springsecuritypage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SpringjmspageComponent } from './spring-jakarta/springjmspage/springjmspage.component';
import { DockerpageComponent } from './dockerpage/dockerpage.component';
import { CentospageComponent } from './dockerpage/centospage/centospage.component';
import { CommandspageComponent } from './dockerpage/commandspage/commandspage.component';
import { SqlpageComponent } from './dockerpage/sqlpage/sqlpage.component';
import { MongopageComponent } from './dockerpage/mongopage/mongopage.component';
import { BuildImagepageComponent } from './dockerpage/build-imagepage/build-imagepage.component';
import { JavathreadsyncpageComponent } from './javapage/javathreadsyncpage/javathreadsyncpage.component';
import { JavaproducerconsumerpageComponent } from './javapage/javaproducerconsumerpage/javaproducerconsumerpage.component';
import { JavadeadlockspageComponent } from './javapage/javadeadlockspage/javadeadlockspage.component';
import { JavafairlockpageComponent } from './javapage/javafairlockpage/javafairlockpage.component';
import { JavafileiopageComponent } from './javapage/javafileiopage/javafileiopage.component';
import { JavabinaryiopageComponent } from './javapage/javabinaryiopage/javabinaryiopage.component';
import { JavaniopageComponent } from './javapage/javaniopage/javaniopage.component';
import { JavanioFilesyspageComponent } from './javapage/javanio-filesyspage/javanio-filesyspage.component';
import { JavaRegExpComponent } from './javapage/java-reg-exp/java-reg-exp.component';
import { JavasortcollectionspageComponent } from './javapage/javasortcollectionspage/javasortcollectionspage.component';
import { JavastaticpageComponent } from './javapage/javastaticpage/javastaticpage.component';
import { JavalambdaspageComponent } from './javapage/javalambdaspage/javalambdaspage.component';
import { JavafxmodulespageComponent } from './androidJavaFX/javafxmodulespage/javafxmodulespage.component';
import { AwsIntroPageComponent } from './dockerpage/aws-intro-page/aws-intro-page.component';
import { AwsSpringComponent } from './dockerpage/aws-spring/aws-spring.component';
import { AndroidJavaFxComponent } from './androidJavaFX/androidjavafx.component';
import { SpringJakartaComponent } from './spring-jakarta/spring-jakarta.component';
import { JakartademoComponent } from './spring-jakarta/jakartademo/jakartademo.component';
import { JakartaCDIComponent } from './spring-jakarta/jakarta-cdi/jakarta-cdi.component';
import { JakartaJpaComponent } from './spring-jakarta/jakarta-jpa/jakarta-jpa.component';
import { JavaArraylistComponent } from './javapage/java-arraylist/java-arraylist.component';
import { JavaLinkedlistComponent } from './javapage/java-linkedlist/java-linkedlist.component';
import { JavaStackComponent } from './javapage/java-stack/java-stack.component';
import { JavaQueueComponent } from './javapage/java-queue/java-queue.component';
import { JavaBinarytreeComponent } from './javapage/java-binarytree/java-binarytree.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },

  { path: 'java', component: JavapageComponent, children: [
    { path: 'javaLambdas', component: JavalambdaspageComponent},
    { path: 'javaStatic', component: JavastaticpageComponent},
    { path: 'javaSortCollections', component: JavasortcollectionspageComponent},
    { path: 'javaRegExp', component: JavaRegExpComponent},
    { path: 'javaThreads', component: JavathreadspageComponent},
    { path: 'javaThreadsShareSync', component: JavathreadsyncpageComponent},
    { path: 'javaThreadSafe', component: JavaproducerconsumerpageComponent},
    { path: 'javaDeadlock', component: JavadeadlockspageComponent},
    { path: 'javaFairlock', component: JavafairlockpageComponent},
    { path: 'javaIO_1', component: JavafileiopageComponent},
    { path: 'javaIO_2', component: JavabinaryiopageComponent},
    { path: 'javaNIO', component: JavaniopageComponent},
    { path: 'javaNIO_2', component: JavanioFilesyspageComponent},
    { path: 'javaClientServer', component: JavaclientserverpageComponent},
    { path: 'javaDesignPatterns', component: JavadesignpatternspageComponent},
    { path: 'javaArrayList', component: JavaArraylistComponent},
    { path: 'javaLinkedList', component: JavaLinkedlistComponent},
    { path: 'javaStack', component: JavaStackComponent},
    { path: 'javaQueue', component: JavaQueueComponent},
    { path: 'javaBinaryTree', component: JavaBinarytreeComponent}
  ] },

  { path: 'androidJavaFX', component: AndroidJavaFxComponent, children: [
    { path: 'androidButton', component: AndroidbuttonpageComponent},
    { path: 'androidCalc', component: AndroidcalculatorpageComponent},
    { path: 'androidRSS', component: AndroidrssreaderpageComponent},
    { path: 'androidYouTube', component: AndroidyoutubepageComponent},
    { path: 'androidFlickr', component: AndroidflickrpageComponent},
    { path: 'androidContentProviders', component: AndroidcontentproviderspageComponent},
    { path: 'androidTaskTimer', component: AndroidtasktimerpageComponent},
    { path: 'javafxGradle', component: JavafxgradleComponent},
    { path: 'javafxModules', component: JavafxmodulespageComponent}
  ] },

  { path: 'springJakarta', component: SpringJakartaComponent, children: [
    { path: 'springMVC', component: SpringmvcpageComponent},
    { path: 'springSecurity', component: SpringsecuritypageComponent},
    { path: 'springREST', component: SpringrestapipageComponent},
    { path: 'springReactive', component: SpringreactivepageComponent},
    { path: 'springAndJMS', component: SpringjmspageComponent},
    { path: 'jakartaDemo', component: JakartademoComponent},
    { path: 'jakartaCDI', component: JakartaCDIComponent},
    { path: 'jakartaJPA', component: JakartaJpaComponent}
  ] },

  { path: 'AngularDB', component: AngulardbpageComponent, children: [
    { path: 'firstDemo', component: AngulardemoComponent},
    { path: 'binding', component: AngularbindingComponent},
    { path: 'directives', component: AngulardirectivesComponent},
    { path: 'services', component: AngularservicesComponent},
    { path: 'routing', component: AngularroutingComponent},
    { path: 'SQL', component: SqlnotesComponent}
  ] },

  { path: 'cPython', component: CpythonpageComponent, children: [
    {path: 'algorithmsInC', component: AdtalgorithmspageComponent},
    {path: 'bashSlide', component: BashslideComponent},
    {path: 'computations', component: ComputationspageComponent}
  ] },

  { path: 'dockerPage', component: DockerpageComponent, children: [
    {path: 'dockerCentOS', component: CentospageComponent},
    {path: 'dockerCommands', component: CommandspageComponent},
    {path: 'dockerSQL', component: SqlpageComponent},
    {path: 'dockerMongo', component: MongopageComponent},
    {path: 'dockerMavenBuild', component: BuildImagepageComponent},
    {path: 'AWSIntro', component: AwsIntroPageComponent},
    {path: 'AWSSpring', component: AwsSpringComponent}
  ] },
  
  { path: '**', component: PageNotFoundComponent}
]

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
