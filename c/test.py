import requests
allTeams = requests.get("https://statsapi.web.nhl.com/api/v1/teams")
allTeamsJson = allTeams.json()

def getTeamRoster(teamId):
    response = requests.get("https://statsapi.web.nhl.com/api/v1/teams/" + str(teamId) + "/?expand=team.roster")
    resJson = response.json();

    for i in range(0, len(resJson['teams'][0]['roster']['roster'])):
        print("     " + resJson['teams'][0]['roster']['roster'][i]['person']['fullName'] + ": Number " + resJson['teams'][0]['roster']['roster'][i]['jerseyNumber'] + ": " + resJson['teams'][0]['roster']['roster'][i]['position']['name'] + ": " + str(resJson['teams'][0]['roster']['roster'][i]['person']['id']))
        playerUrl = resJson['teams'][0]['roster']['roster'][i]['person']['link']
        playerStats = requests.get("https://statsapi.web.nhl.com" + playerUrl + "/stats" + "?stats=statsSingleSeason&season=20212022")
        playerStatsJson = playerStats.json()
        try:
            if resJson['teams'][0]['roster']['roster'][i]['position']['name'] != 'Goalie':
                print('         Shots: ' + str(playerStatsJson['stats'][0]['splits'][0]['stat']['shots']))
                print('         Goals: ' + str(playerStatsJson['stats'][0]['splits'][0]['stat']['goals']))
                print('         Assists: ' + str(playerStatsJson['stats'][0]['splits'][0]['stat']['assists']))
                print('         Games: ' + str(playerStatsJson['stats'][0]['splits'][0]['stat']['games']))
                print('         Plus Minus: ' + str(playerStatsJson['stats'][0]['splits'][0]['stat']['plusMinus']))
                print('         Goals per shot: ' + str(round(playerStatsJson['stats'][0]['splits'][0]['stat']['goals'] / playerStatsJson['stats'][0]['splits'][0]['stat']['shots'], 3)))
                print(" ")
            else:
                print("         Get good")
                print(" ")
                continue   
        except:
            print('         No data found')
            print(' ')
            continue 


for t in range(1, len(allTeamsJson['teams'])):
    team = requests.get("https://statsapi.web.nhl.com/api/v1/teams/" + str(t) + "?expand=team.stats").json()
    response = requests.get("https://statsapi.web.nhl.com/api/v1/teams/" + str(t) + "?expand=team.roster")
    resJson = response.json();
    try:    
        print(team['teams'][0]['franchise']['teamName'] + ':')
        print('Wins ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['wins']))
        print('Losses ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['losses']))
        print('Goals/Game: ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['goalsPerGame']))
        print('Powerplay %: ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['powerPlayPercentage']))
        print('Penalty Kill %: ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['penaltyKillPercentage']))
        print('Save %: ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['savePctg'] * 100))
        print('faceoff win %: ' + str(team['teams'][0]['teamStats'][0]['splits'][0]['stat']['faceOffWinPercentage']))
        print(' ')
        
        getTeamRoster(t)
        
    except:
        print("No data available")
        continue    


