Totara Mobile App Changelog

Release 1.1.10 (24th Nov 2022):
=====================================

Bug
MOB-1168 - Links in notifications are not clickable
MOB-1174 - Cannot sync SCORM data
MOB-1175 - [iOS] "Mobile browser" authentication doesn't work

Task
MOB-1095 - Upgrade Jenkins machine to Xcode 13 and Mac OS Monterey if needed

Improvement
MOB-1176 - Unit test review for Session Container component 

Release 1.1.9 (22nd Jun 2022):
=====================================

Bug
MOB-1137 - [Sentry report] - CourseGroupDetails component crashes when returns null
MOB-1144 - Video file resource doesn't open in mobile app
MOB-1150 - Debounce sequence of downloads
MOB-1151 - Android PDF viewing stopped working in 1.1.6
MOB-1153 - Characters in notifications titles should not show as HTML entities

Improvement
MOB-1140 - Remove http access for Android devices
MOB-1155 - Fullscreen should be allowed in Android Webviews

Release 1.1.8 (16th May 2022):
=====================================

Bug
[MOB-1147] - Sentry issue - typeError Cannot read property 'statusCode' of undefined

Improvement
[MOB-1141] - Android - Move api key to keystore
[MOB-1143] - Bump android version so Janus security vulnerability concerns are addressed

Release 1.1.7 (3rd May 2022):
=====================================

Bug
[MOB-1135] - [Sentry report] App crashes when profileImage field is empty
[MOB-1138] - [Sentry report] App crashes for Android resuming download
[MOB-1139] - Find Learning - guest access should work for all cases
[MOB-1146] - Runtime exception on Sentry report

Improvement
[MOB-1105] - Unavailable courses should be greyed out

Release 1.1.6 (30th March 2022):
=====================================

Bug
[MOB-1106] - Missing lang string in Totara Mobile

Improvement
[MOB-803] - Upgrade React Native lib to 0.67
[MOB-1061] - Write Doc for How to contribute to the code base using our best practices and 
standards
[MOB-1086] - Make Firebase & Sentry configurations easier and clearer
[MOB-1087] - Add unit test for AuthenticatedWebview, WebviewWrapper
[MOB-1088] - Clarify .env documentation questions and doc location
[MOB-1091] - Incompatibility with Xcode 13 and Xcode 12.5
[MOB-1102] - Include App Bundle release option for the mobile app
[MOB-1108] - Getting Started - Login screen navigation
[MOB-1109] - Navigating Current Learning - Program and Course
[MOB-1122] - Make sure the main unit tests are still green
[MOB-1127] - Fix render timeout unit tests issues

Technical documentation
[MOB-1085] - Add detailed environment setup section in our public dev docs

Release 1.1.5 (15th March 2022):
=====================================

Bug
[MOB-1099] - Due date display for programs and certifications is incorrect
[MOB-1107] - SCORM video is not playing on iOS
[MOB-1128] - Mobile app loses site settings when no connection to the internet

Improvement
[MOB-1102] - Include App Bundle release option for the mobile app

Release 1.1.4 (21st Jan 2022):
=====================================

Bug
[MOB-1026] - Topic sections not displayed in Mobile if no activities
[MOB-1067] - Update detox schema data file so the Automated test is back working
[MOB-1081] - Webview login show error for Android login

Improvement
[MOB-1072] - Notification error unit test
[MOB-1073] - Profile-test file TODO: Unable to find node on an unmounted component
[MOB-1074] - Authentication unit testing low coverage
[MOB-1077] - Detox tests should not break when app is logged-in
[MOB-1080] - Enable Find Learning (Catalogue) to be configurable
[MOB-1082] - Authentication unit testing for user login

Release 1.1.3 (6th Dec 2021):
=====================================

Bug
[MOB-1076] - Android App cannot be opened(in a few devices) due to sentry lib issue

Release 1.1.2 (2nd Dec 2021):
=====================================

Improvement
[MOB-1063] - Remove xhr events in breadcrumbs data from Sentry

Release 1.1.1 (26th Nov 2021):
=====================================

Bug
[MOB-1035] - When server returns 500, try again button crashes the App
[MOB-1037] - Mobile friendly course summary adds extra characters in mobile app
[MOB-1039] - Not possible to scroll or move to selected field in webview
[MOB-1046] - Unable to load more than 20 courses in find learning
[MOB-1052] - When server returns 500, the app shows wrong "network message"
[MOB-1053] - Findlearning view and filter query pointer should use responce pointer value for paggination
[MOB-1064] - Profile screen gets to a "try again screen" when the servers crashes
[MOB-1066] - App should continue deregistering mobile devices when logging out

Improvement
[MOB-1043] - Update Android target to API level 30
[MOB-1056] - Secure storage API key in the encrypted storage

Release 1.1 (19th Oct 2021):
=====================================

New Feature
[MOB-948] - Create a new bottom tab item and dummy page
[MOB-960] - Find Learning: Loading state
[MOB-961] - Find Learning: Result tiles for courses, resources and playlists
[MOB-962] - Find Learning: Course overview modal
[MOB-973] - Backend integration with Find learning screen
[MOB-983] - Enrolment Options - data integration
[MOB-984] - Enrolment Options - Enrol/Go to course

Bug
[MOB-986] - 'Current learning' page empty state: Link to Find learning in the app
[MOB-987] - Find learning: Cache not cleared when reseting search
[MOB-989] - Find learning: 4 issues with tiles
[MOB-990] - Find learning default view is empty
[MOB-997] - Skeleton placeholders design
[MOB-1004] - Find learning tiles pane is too short
[MOB-1008] - Course overview modal is rendering the course summary incorrectly
[MOB-1027] - Mobile app crashes when acessing a course
[MOB-1029] - Adjust guest password validation
[MOB-1031] - 'Find learning' link in Current learning empty state in t13/t14 leads to dashboard

Task
[MOB-998] - Review default images
[MOB-1016] - Test web view changes for Totara 13 and 14

Improvement
[MOB-952] - Refine design of Bottom Tab Bar based on DES-645
[MOB-965] - REFACTOR: Decouple course access from current learning
[MOB-967] - Course overview - data integration
[MOB-970] - Remove react-native-safe-area-view lib
[MOB-971] - Overview Modal full scroll mode
[MOB-975] - Pagination/Infinite scrolling improvement and Unit test
[MOB-976] - Enrolment options modal
[MOB-982] - Show/hide find learning in the app based on backend availability
[MOB-1000] - Resources view
[MOB-1001] - Playlist view

Release 1.0.13 (15th Oct 2021):
=====================================

Bug
[MOB-1012] - Autoplaying embedded video in resource webview
[MOB-1024] - SCORM stopped working for some packages
[MOB-1027] - Mobile app crashes when accessing a course
[MOB-1028] - App crashes when clicking on a link in a course

Improvement
[MOB-1025] - Fix Android core lib version to a stable version

Release 1.0.12 (27th Aug 2021):
=====================================

Bug
[MOB-805] - Not all logging present in Totara Mobile
[MOB-913] - implementing promise handler when user logout
[MOB-920] - Videos embedded in the mobile app do not display correctly unless made full screen
[MOB-942] - Expanding weka content activity should not show warning
[MOB-944] - Characters in course activity section titles should not show as HTML entities
[MOB-956] - Error in courses list info inside a program or certificate set
[MOB-969] - Navigation to Course in program is not working
[MOB-972] - App should show course overview
[MOB-977] - Versions information not showing corectly
[MOB-980] - Learning items view list translation error
[MOB-988] - Remove console logs
[MOB-1005] - Additional Actions not working
[MOB-1009] - When user log into the app it should set correct session data

Improvements
[MOB-786] - Authentication flow should use Navigation API instead of switching components in one screen
[MOB-927] - App state handling
[MOB-945] - Navigation API for webview login
[MOB-946] - Navigation API for browser login
[MOB-953] - Add support for Fastlane, run builds and code signing easier
[MOB-954] - Auth Code Review
[MOB-1006] - Create Core query

Release 1.0.11 (17th Jun 2021):
=====================================

Bug
[MOB-934] - Overdue date should be shown in the course detail screen on iPhone
[MOB-935] - There is extra space after the scroll bar indicator in Learning item
[MOB-937] - "Mobile browser" authentication doesn't work
[MOB-940] - Put a limit on the Bullet/ordered list levels
[MOB-931] - SCORM landscape should be full screen and show responsive content

Improvements
[MOB-806] - Restructuring weka viewer
[MOB-899] - Instructions for developers so we are able to log out in dev mode
[MOB-925] - When completing a activity from within the app it does not update the completion state immediately
[MOB-928] - Refactoring Styles to the new weka viewer
[MOB-930] - The app crash when SCORM package is used after the download

Release 1.0.10 (26th May 2021):
=====================================

Bug
[MOB-911] - SCORM content not displayed in landscape view in mobile app
[MOB-905] - Course sections without activities
[MOB-922] - Loading spinner in Course details is not working
[MOB-923] - Tapping on a PN pop up doesn't go to the target notification
[MOB-904] - Cannot open link within PDF file on Android devices

Task
[MOB-900] - Language in Mobile app seems to be dependant on language detection
[MOB-912] - Investigate why some SCORM packages are not navigable on Webviews

Improvements
[MOB-796] - Refine focus order in all screens(Discovery)
[MOB-819] - Embedded Media(Audio/Video) should show in the inline-player
[MOB-895] - Mocked server for Native login flow

Technical documentation
[MOB-919] - Improve release documentation

Release 1.0.9 (30th March 2021):
=====================================

Bug
[MOB-804] - File view does not trigger completion in Totara Mobile
[MOB-901] - Statusbar color does not return to default color when switching tabs
[MOB-910] - iOS app should receive push notification
[MOB-915] - SCORM type activity does not save state or register attempt in the app

Improvement
[MOB-870] - Implement Detox test cases for scorm
[MOB-879] - Detox with mocked server for Current Learning
[MOB-888] - Remove LinkMedia description in WekaViewEditor
[MOB-898] - Move testing credentials to local config file
[MOB-903] - If the mobile app is logged out of any downloaded SCORMs are deleted.

Technical documentation
[MOB-887] - Review technical documentation on the mobile side for PN

Release 1.0.8 (05th March 2021):
=====================================

Bug
[MOB-883] - In-app notification not appearing until bell icon is selected and refresh the list
[MOB-893] - Activities should not crash when the list of activities has a video
[MOB-891] - Force password change does not redirect user to browser and prevents login to Totara Mobile app

Improvement
[MOB-882] - Reshape Learning Details header
[MOB-885] - Images added in the WEKA text editor do not scale down correctly when viewed on the mobile app
[MOB-890] - Use `fullmessageHTML` field in notifications when the format is HTML

Release 1.0.7 (29th January 2021):
=====================================
Bug
[MOB-880] - translations falls back to english

Release 1.0.6 (20th January 2021):
=====================================
Bug
[MOB-380] - Change password while using the app
[MOB-749] - Should return keyboard while showing Incompatible site url modal
[MOB-775] - Tertiary button colour is not aligned with the design
[MOB-860] - New line on current learning cards should respect case from HTML text editor
[MOB-873] - List icon on the carousel/list switch should be rounded
[MOB-877] - Language strings are not being translated
[MOB-875] - Make languages installation script work on Windows

Task
[MOB-874] - Environment updates should be capable of project installation

Improvement
[MOB-654] - Activity sheet transition
[MOB-683] - Refactor theme within the code to map to style guide
[MOB-684] - Use native navigation elements where possible
[MOB-822] - Check message format for Notifications details
[MOB-841] - Set up webview in notification details so I can see the notification content
[MOB-853] - Implement Detox test cases for programs/certification
[MOB-854] - Implement Detox test cases for user profile
[MOB-872] - (Discovery) Detox work with mock data instead of real API data

Release 1.0.5 (17th December 2020):
=====================================

Bug
[MOB-859] - Cannot download SCORM activity after you submit answers
[MOB-861] - Couser layout should remains as expected when switch back from landscape activities

Task
[MOB-813] - Check for copied code that doesn’t comply with our licenses
[MOB-865] - Upload release 1.0.4 to beta distribution(testflight/Gplay)
[MOB-867] - Upload release 1.0.5 to beta distribution(testflight/Gplay)

Improvement
[MOB-620] - In-App notifications auto refresh
[MOB-792] - Layout is broken when font size is changed
[MOB-794] - No voice over for manual and auto completion check boxes
[MOB-795] - No voice over for download icon in SCORm summary screen
[MOB-797] - Accessibility property for all the images
[MOB-823] - Set up react navigation library compatibility module
[MOB-850] - Implement Detox test cases for authentication
[MOB-851] - Implement Detox test cases for current learning ( iOS set up only )
[MOB-858] - Update header of API calls to use X-API-Key instead of authorisation header
[MOB-864] - Reset badge in the App icon when reading a notification

Release 1.0.4 (3rd December 2020):
=====================================

Bug
[MOB-855] - Notifications list must update time automatically

Improvement
[MOB-475] - App Internal/external Distribution change
[MOB-620] - In-App notifications auto refresh
[MOB-682] - Refine tabs
[MOB-721] - UI - Pressed state for cards
[MOB-791] - No voice over for the current learning switch
[MOB-793] - No voice over for expand all switch
[MOB-794] - No voice over for manual and auto completion check boxes
[MOB-848] - Run Axe report to check the accessibility issues
[MOB-850] - Implement Detox test cases for authentication
[MOB-851] - Implement Detox test cases for current learning

Release 1.0.3 (18th November 2020):
=====================================

Bug  
[MOB-834] - Images/Icons not showing on iOS 14 devices

Task
[MOB-561] - [Discovery] Orientation Portrait/Landscape

Improvement  
[MOB-778] - Summary Weka text should be shown in the current learning cards
[MOB-836] - App updates must target Android 10 (API level 29) or higher
[MOB-840] - Enable dynamic orientation for all activities

Release 1.0.0 (23th September 2020):
=====================================

Bug  
[MOB-753] - Single activity course UI refinements  
[MOB-757] - Activity should stay as expanded after user tap on manual completion  
[MOB-765] - Learning item summary text should show tidied up in the carousel item  
[MOB-768] - Course from a course set is not being loaded  
[MOB-773] - Show loading for the pdf activity  

Improvement  
[MOB-751] - Use semantic version to communicate min version  
[MOB-779] - Upload release 1.0.0 to beta distribution(testflight/Gplay)  


Release 0.29 (09th September 2020):
=====================================

Bug  
[MOB-625] - Unable to view files within webview (Android only) - no Mimetype in API  
[MOB-728] - Downloads not being cleared when user logouts  
[MOB-736] - Activity text colour is changing every time when user tap on them (even there is no action for them)  
[MOB-739] - Learning items should not be repeated in the current learning  
[MOB-742] - Empty(Null) Course group is not delt in the App and crashes the App - Sentry reports  
[MOB-758] - Course details not working because ids have changed  

New Feature  
[MOB-676] - Cache last URL used to authenticate into the app  
[MOB-699] - Send token to the server  
[MOB-700] - Direct users to notifications list in the app  

Task  
[MOB-730] - Remove sentryUri from main config.ts to config.local.ts  

Improvement  
[MOB-415] - Every activity collapse/expand in Course UI  
[MOB-512] - Swap licenses  
[MOB-685] - Enter URL Screen: Move forgot password link below enter button  
[MOB-690] - Exit icon on SCORM summary screen should be consistent with other exit icons  
[MOB-710] - Program and Cert view more link  
[MOB-716] - UI - Default image size is not consistent  
[MOB-722] - Empty state for "All attempts grades screen"  
[MOB-727] - CourseSet: add course progress bar  


Release 0.28 (26th August 2020):
=====================================

Bug  
[MOB-658] - Status bar content colour  
[MOB-695] - Android: Progress circle is cut off by the next card  
[MOB-711] - Android: Get started ui will collapse when scroll-up key board  
[MOB-712] - increase row height in the the list view of profile(very hard to press)  
[MOB-713] - Default images' borders not being applied when the listing orientation is selected  
[MOB-717] - UI - Due date overlap  
[MOB-720] - Course image is not updating  
[MOB-725] - Online scorm player dropped connection should show cached Scorm summary  

Improvement  
[MOB-273] - Version negotiation after site url screen (before login) part 2  
[MOB-662] - SCORM: UX Issues  
[MOB-667] - Replace mobile imagery  
[MOB-686] - Remove borders on all cards in the app  
[MOB-689] - Current Learning: Responsive texts  
[MOB-703] - Adjust Offline message and confirm UX when it appears  
[MOB-705] - Notify user, for any activity, when the user goes offline. [DESCOPED - see comments]  
[MOB-709] - Upgrade react-native-webview  
[MOB-715] - UI - Modal height refinement  
[MOB-750] - Use build number version to communicate min version [ temporary measure ]  

Technical documentation  
[MOB-572] - Firebase set up for different mob environments  
[MOB-707] - Manual User Acceptance Testing plan for Learning  