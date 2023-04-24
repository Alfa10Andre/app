//
//  TotaraExtensions.m
//  TotaraMobileApp
//
//  Created by Rodrigo Mathias on 10/12/20.
//

#import "TotaraExtensions.h"
#import <React/RCTLog.h>

@implementation TotaraExtensions
RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(setNotificationBadgeCount:(NSInteger) count)
{
  dispatch_async(dispatch_get_main_queue(), ^{
    RCTSharedApplication().applicationIconBadgeNumber = count;
  });
}

@end
