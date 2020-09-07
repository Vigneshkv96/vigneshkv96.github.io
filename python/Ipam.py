################################################################################################
# This script is intended to register Ip to hostname in IPAM by checking the availabilty of IP
# in IPAM and cross verifying the IP by pinging the IP to be extra cautious and allocate the 
# free IP to hostname in IPAM
###############################################################################################



####################################################################################################
# Intializing all the variables                                                                    #
####################################################################################################


datetimeModuleError =  None
platformModuleError = None
logFile = None
ipm_subnet_id = None
validator = None
name = None
ipm_subnet_id = None
query_para_ip = None
val = None
ip_free = None
ip_list = []
admin_ip_list = []


#########################################################################################################
# Importing necessary modules for logFile creation                                                      #
#########################################################################################################

try:
    import datetime
except ImportError:
    datetimeModuleError = "datetime module was not imported"

try:
    import platform
except ImportError:
    platformModuleError = "platform module was not imported"

try:
    import sys
except ImportError:
    pass

#########################################################################################################
# End of Import modules                                                                                 #
#########################################################################################################

#########################################################################################################
# Importing moodules                                                                                    #
#########################################################################################################

if(datetimeModuleError):
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : datetime module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
if(platformModuleError):
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : platform module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

try:
    import time
except ImportError:
    print ('time module was not imported \n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : time module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

try:
    import requests
except ImportError:
    print ('requests module was not imported. \n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : requests module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

try:
    from netaddr import *
except ImportError:
    print ('netaddr module was not imported. \n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : netaddr module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()
	
try:
    import ipaddress
except ImportError:
    print ('ipaddress module was not imported. \n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : ipaddress module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()



try:
    import os
except ImportError:
    print ('os module was not imported.\n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : os module was not imported.\n" % (datetime.datetime.now()))
    f.write ("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

try:
    import re
except ImportError:
    print ('re module was not imported.\n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : re module was not imported.\n" % (datetime.datetime.now()))
    f.write("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

try:
    import subprocess
except ImportError:
    print('subprocess module was not imported.\n')
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : subprocess module was not imported.\n" % (datetime.datetime.now()))
    f.write("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()


try:
    import time
except ImportError:
    print("time module was not imported.\n")
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : time module was not imported.\n" % (datetime.datetime.now()))
    f.write("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

try:
    import sys
except ImportError:
    print("sys module was not imported.\n")
    f = open(logFile, "a+")
    f.write("%s [LOG ERROR] : sys module was not imported.\n" % (datetime.datetime.now()))
    f.write("%s [STATUS] : Failure \n" % (datetime.datetime.now()))
    f.close()

#########################################################################################################
# End of End of Import modules                                                                          #
#########################################################################################################
#########################################################################################################
#Capturing Arguments passed through command line                                                        # 
#########################################################################################################

alertExecId = "admin_ip3"

#########################################################################################################
# End of Capturing Arguments passed through command line                                                #
#########################################################################################################

#########################################################################################################
# Assigning logFile                                                                                     #
#########################################################################################################


if platform.system() == 'Windows':
    
    #logFile = "C:\\NetworkAutomation\\"+alertExecId+".log"
	logFile = alertExecId+".log"
else:
    logFile = alertExecId+".log"



print (datetime.datetime.now(), " [LOG INFO] : Actions Taken: \n")
print (datetime.datetime.now(), " [LOG INFO] : Log file created by the name:", alertExecId+".log \n")

f = open(logFile,"w+")
f.write ("%s [LOG INFO] : Actions Taken: \n" % ( datetime.datetime.now()))
f.write ("%s [LOG INFO] : Log file created by the name: %s.log \n" % (datetime.datetime.now(), alertExecId))
f.close()

#########################################################################################################
# End of logFile assignment                                                                             #
#########################################################################################################


ip_range = sys.argv[1]
env = sys.argv[2]
hostname = sys.argv[3]
admin_ip_range = sys.argv[4]
ip = IPNetwork(ip_range)
start_ip = ip.ip
end_ip = ip.broadcast
admin_ip = IPNetwork(admin_ip_range)
admin_start_ip = admin_ip.ip
admin_end_ip = admin_ip.broadcast 

print(start_ip,"startIP")
print(end_ip,"end_ip")
print (admin_start_ip,"admin_start_ip")
print (admin_end_ip,"admin_end_ip")


####################################################################################################
# End of Intializing all the variables                                                             #
####################################################################################################


class IPAM():
    def IP_register(self,start_ip,end_ip,validator):
        f = open(logFile,"a+")
        f.write ("%s [LOG INFO] : ****************Calling the find_subnet function to get the subnet_id************* \n" % ( datetime.datetime.now()))
        f.write ("%s [LOG INFO] : Parameter passed to the function are startIP: %s and endIP: %s .\n" % (datetime.datetime.now(), start_ip,end_ip))
        f.close()
        #print (datetime.datetime.now(), " [LOG INFO] : ****************Calling the find_subnet function to get the subnet_id************* \n")
        #print (datetime.datetime.now(), " Parameter passed to the function are startIP: ",start_ip +" and endIP: ",end_ip)
		
		
        ipm_subnet_id = self.find_subnet_id(start_ip,end_ip)
		
        f = open(logFile,"a+")
        f.write ("%s [LOG INFO] : *************SUBNET ID: %s \n" % (datetime.datetime.now(),ipm_subnet_id))
        f.close()
        #print (datetime.datetime.now(), " [LOG INFO] : %s \n" %(ipm_subnet_id))
		
        ip_free_list = []
        admin_ip_list = []
		
        if ipm_subnet_id == "NULL":
            err_msg = "The subnet <" + str(subnet_name) + "> doesn't exist!"
            print(err_msg)
            
        else:
            query_para_ip = {"subnet_id": str(ipm_subnet_id)}
            f = open(logFile,"a+")
            f.write ("%s [LOG INFO] : **************Making an API call to get the list of freeIP's using call_ipam function*********** \n"%(datetime.datetime.now()))
            f.close()
            rt_code_ip,rt_content_ip = self.call_ipam("rpc","OPTIONS","ip_find_free_address",query_para_ip)
			
            #print(rt_content_ip)
            for val in rt_content_ip:
                #print(val['hostaddr'])
                ip_list.append(val['hostaddr'])
                #print (ip_list,"ip_list")
				
            f = open(logFile,"a+")
            f.write ("%s [LOG INFO] : ******************Defining the Class Parameter for  hostname as %s and setting dns_update as 1 \n" % (datetime.datetime.now(),hostname))       
            f.close()
                
            ip_class_para = {'hostname':str(hostname),'dns_update': '1'}
            str_class_para = "&".join(("{}={}".format(*i)
                                for i in ip_class_para.items()))

            for val in ip_list:
                f = open(logFile,"a+")
                f.write ("%s [LOG INFO] : *********The IP inside the free_ip_list %s is going for Prechecks of Ping and NSLOOKUP \n" % ( datetime.datetime.now(),val)) 
                f.close()
                
                ip_free = self.Ping_Activity(val) 
                print(ip_free)
                if ip_free == 0:
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] : *********The IP : %s has passed the prechecks \n" % ( datetime.datetime.now(),val))
                    f.close()
                      
                    if validator == 'public':
                        if env == 'prod':
                            name = hostname + '.xxx.com'
                        if env == 'preprod':
                            name = hostname + '.xxxx.com'
                    else:
                        if env == 'prod':
                            name = hostname + '.xxxx.com'
                        if env == 'preprod':
                            name = hostname + '.xxxxx.com'
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] : ********The ip_name formed based on environment is %s \n" % ( datetime.datetime.now(),name))
                    f.close()
					
                    query_para_ip = {"site_id": '2',"hostaddr":str(val),"name":str(name),"add_flag": 'new_edit',"ip_class_name":"IPAM/Server_NOC",'ip_class_parameters': str_class_para}
                    
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] : *********** The IP %s is getting register with IPAM \n" % ( datetime.datetime.now(),val))
                    f.close()
                    rt_code,rt_content_ip = self.call_ipam("rest","POST","ip_add",query_para_ip)
                    print(rt_code,"registering Part")
                    if rt_code == 201:
                        f = open(logFile,"a+")
                        f.write ("%s [LOG INFO] : ********* The IP %s has been registered sucessfully with IPAM \n" % ( datetime.datetime.now(),val))
                        f.close()
                        
                        return val
                    else:
                        f = open(logFile,"a+")
                        f.write ("%s [LOG INFO] : ********** The IP  %s has an issue registering with IPAM so next IP from List is considered for process..... \n" % ( datetime.datetime.now(),val))  
                        f.close()
                        continue
                    
                        
    def call_ipam(self,api_method, http_verb, api_call, input_param):
        base_url = "https://x.x.x.x.com"

        custom_headers = {'X-IPM-Username': 'xxxxx',
                          'X-IPM-Password': 'xxxxx',
                          'cache-control': 'xxxx'
                         }

        query_url = str(base_url) + "/" + str(api_method) + "/" + str(api_call)
        print(query_url)
             

        requests.packages.urllib3.disable_warnings()

        response = requests.request(http_verb,
                                    query_url,
                                    headers=custom_headers,
                                    params=input_param,
                                    verify=False
                                    )

        response_code = response.status_code

        if response_code == 200:
            query_response = response.json()
            return response_code, query_response

        else:
            query_response = response.text
            return response_code, query_response


    def find_subnet_id(self,start_ip,end_ip):

        str_where = "site_id='2' and " + \
                    "start_hostaddr='" + str(start_ip) + "' and " + \
                    "end_hostaddr= '"+ str(end_ip) + "'"
        query_para_subnet = {"SELECT": "subnet_id",
                            "WHERE": str(str_where),
                            "GROUPBY": ""
                            }
        rt_code_net, rt_content_net = self.call_ipam("rest",
                                                "GET",
                                                "ip_block_subnet_groupby",
                                                query_para_subnet
                                                )
        if rt_code_net == 200:
            ipm_net_id = rt_content_net[0]['subnet_id']
            return ipm_net_id

        else:
            return "NULL"
    def Ping_Activity(self,deviceIP):
            pingResponse = os.system("ping -n 1 " + deviceIP)
            if pingResponse == 0:
                #print (datetime.datetime.now(), "[LOG INFO]: Ping to  was successful, Cant use this IP. \n",str(deviceIP),"\n")
                f = open(logFile,"a+")
                f.write ("%s [LOG INFO] : Ping to %s was successful ,cant use this IP. \n" % ( datetime.datetime.now(),deviceIP))
                f.close()
                p = subprocess.Popen('nslookup {}'.format(deviceIP),shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                l=[]
                encoding = 'utf-8'
                for line in p.stdout.readlines():
                #print(line)

                    l.append(line.decode(encoding))
                #print(l)
                if any("Non-existent" in s for s in l):
                    print("Not assigned to any doamin,This IP is free \n")
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] : Not assigned to any doamin,This IP %s is free.\n" % ( datetime.datetime.now(),device))
                    f.close()
                    return 0
                else:
                    print("Already asssigned to domain,This IP is not free \n")
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] : Already asssigned to domain,This IP %s is not free \n" % ( datetime.datetime.now(),deviceIP))
                    f.close()
                    return 1
            else:
                print("ping was not sucesssful \n")
                f = open(logFile,"a+")
                f.write ("%s [LOG INFO] :ping was not sucesssful with this IP %s \n" % ( datetime.datetime.now(),deviceIP))
                f.close()
                p = subprocess.Popen('nslookup {}'.format(deviceIP),shell=True, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)
                l=[]
                encoding = 'utf-8'
                for line in p.stdout.readlines():
                #print(line)

                    l.append(line.decode(encoding))
                #print(l)
                if any("Non-existent" in s for s in l):
                    print("Not assigned to any doamin,This IP is free \n")
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] :Not assigned to any doamin,This IP %s is free \n" % ( datetime.datetime.now(),deviceIP))
                    f.close()
                    return 0
                else:
                    print("Already asssigned to domain,This IP is not free \n")
                    f = open(logFile,"a+")
                    f.write ("%s [LOG INFO] :Already asssigned to domain,This IP %s is not free \n" % ( datetime.datetime.now(),deviceIP))
                    f.close()
                    return 1
                   
                       
                       
print("********************** AN instance of class is being created ************** \n")
f = open(logFile,"a+")
f.write ("%s [LOG INFO] :********************** AN instance of class is being created ************** \n" % ( datetime.datetime.now()))
f.close()
                      
obj = IPAM()

print('************************Calling the IP_register Function to Register a Public_FreeIP for '+ "hostname" +"\n")
f = open(logFile,"a+")
f.write ("%s [LOG INFO] :************************Calling the IP_register Function to Register a Public_FreeIP for %s \n" % ( datetime.datetime.now(),hostname))
f.close()

public_ip_value = obj.IP_register(start_ip,end_ip,'public')
ip_list.clear()

f = open(logFile,"a+")
f.write ("%s [LOG INFO] :************************Calling the IP_register Function to Register a Public_FreeIP for %s \n" % ( datetime.datetime.now(),hostname))
f.close()

print('*************************For '+ hostname + 'the following Public IP is Registered '+public_ip_value +"\n")
print('######################################################################################################### \n')
print('*************************For '+ hostname + 'the following Public IP is Registered '+public_ip_value +"\n")
print('*****************************Calling the IP_register Function to Register a Admin_FreeIP for '+hostname + "\n")

f = open(logFile,"a+")
f.write ("%s [LOG INFO] :*************************For %s the following Public IP is Registered %s \n" % (datetime.datetime.now(),hostname,public_ip_value))
f.write ("%s [LOG INFO] :######################################################################################################### \n" % ( datetime.datetime.now()))
f.write ("%s [LOG INFO] :*************************For %s the following Public IP is Registered  %s \n" % (datetime.datetime.now(),hostname,public_ip_value))
f.write ("%s [LOG INFO] :*****************************Calling the IP_register Function to Register a Admin_FreeIP for %s \n" % (datetime.datetime.now(),hostname))

f.close()

admin_ip_value = obj.IP_register(admin_start_ip,admin_end_ip,'admin')

print('*************************For '+ hostname + 'the following Admin_FreeIP is Registered '+admin_ip_value +"\n")




'''
admin_id = find_subnet_id(admin_start_ip,admin_end_ip)
print(admin_id,"admin_subnet_ID")
if admin_id == "NULL":
    err_msg = "The subnet <" + str(subnet_name) + "> doesn't exist!"
    print(err_msg)
    exit
else:
    query_para_ip = {"subnet_id": str(admin_id)
                     #"max_find": '1'
                     }

    #rt_code_ip, rt_content_ip = call_ipam("rpc",
    #                                      "OPTIONS",
    #                                      "ip_find_free_address",
    #                                      query_para_ip
    #                                      )
              
              
    rt_code_ip,rt_content_ip = call_ipam("rpc","OPTIONS","ip_find_free_address",query_para_ip)
    print(rt_content_ip)
    for val in rt_content_ip:
        print(val['hostaddr'])
        admin_ip_list.append(val['hostaddr'])
    print (admin_ip_list,"ip_list")
    ip_class_para = {'hostname':str(hostname),'dns_update': '1'}
    str_class_para = "&".join(("{}={}".format(*i)
                               for i in ip_class_para.items()))

    for val in admin_ip_list:
        ip_free = Ping_Activity(val) 
        print(ip_free)
        if ip_free == 0:         
           if env == 'prod':
              name = hostname + '.xxx.com'
           if env == 'preprod':
              name = hostname + '.xxxx.com'
           query_para_ip = {"site_id": '2',"hostaddr":str(val),"name":str(name),"add_flag": 'new_edit',"ip_class_name":"IPAM/Server_NOC",'ip_class_parameters': str_class_para}
           rt_code,rt_content_ip = call_ipam("rest","POST","ip_add",query_para_ip)
           print(rt_code,"registering PArt")
           break 
           
           
'''
