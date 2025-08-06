"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SettingsIcon, User, Bell, Shield, Palette, Save, Download, Upload, Trash2 } from "lucide-react"

export function Settings() {
  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: false,
    videoUploads: true,
    analysisComplete: true,
    weeklyReports: false,
  })

  const [preferences, setPreferences] = useState({
    language: "es",
    timezone: "Europe/Madrid",
    theme: "dark",
    autoSave: true,
    videoQuality: "high",
  })

  const handleSave = () => {
    console.log("Saving settings:", { notifications, preferences })
    alert("Configuración guardada exitosamente")
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-700 rounded-lg flex items-center justify-center">
            <SettingsIcon className="h-6 w-6 text-blue-400" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-blue-400">Configuración</h1>
            <p className="text-slate-400">Personaliza tu experiencia en ARGO</p>
          </div>
        </div>
        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
          <Save className="h-4 w-4 mr-2" />
          Guardar Cambios
        </Button>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="profile" className="data-[state=active]:bg-slate-700">
            <User className="h-4 w-4 mr-2" />
            Perfil
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-slate-700">
            <Bell className="h-4 w-4 mr-2" />
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="preferences" className="data-[state=active]:bg-slate-700">
            <Palette className="h-4 w-4 mr-2" />
            Preferencias
          </TabsTrigger>
          <TabsTrigger value="security" className="data-[state=active]:bg-slate-700">
            <Shield className="h-4 w-4 mr-2" />
            Seguridad
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Información Personal</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Nombre Completo</Label>
                  <Input
                    defaultValue="Dr. Miguel Fernández"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Email</Label>
                  <Input
                    type="email"
                    defaultValue="miguel.fernandez@argo.com"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Teléfono</Label>
                  <Input defaultValue="+34 612 345 678" className="bg-slate-700 border-slate-600 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Especialización</Label>
                  <Input
                    defaultValue="Biomecánica Deportiva"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Información Profesional</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Certificaciones</Label>
                  <Input defaultValue="NSCA-CSCS, ACSM-CEP" className="bg-slate-700 border-slate-600 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Años de Experiencia</Label>
                  <Input type="number" defaultValue="8" className="bg-slate-700 border-slate-600 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Centro de Trabajo</Label>
                  <Input
                    defaultValue="Centro de Alto Rendimiento Madrid"
                    className="bg-slate-700 border-slate-600 text-white mt-1"
                  />
                </div>
                <div>
                  <Label className="text-slate-300">Biografía</Label>
                  <textarea
                    className="w-full bg-slate-700 border-slate-600 text-white rounded-md p-2 mt-1"
                    rows={3}
                    defaultValue="Especialista en análisis biomecánico con 8 años de experiencia en deportes de fuerza."
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Configuración de Notificaciones</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Notificaciones por Email</h4>
                  <p className="text-sm text-slate-400">Recibe actualizaciones importantes por correo</p>
                </div>
                <Switch
                  checked={notifications.emailNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Notificaciones Push</h4>
                  <p className="text-sm text-slate-400">Notificaciones en tiempo real en el navegador</p>
                </div>
                <Switch
                  checked={notifications.pushNotifications}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Nuevos Videos Subidos</h4>
                  <p className="text-sm text-slate-400">Notificar cuando los clientes suban videos</p>
                </div>
                <Switch
                  checked={notifications.videoUploads}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, videoUploads: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Análisis Completados</h4>
                  <p className="text-sm text-slate-400">Notificar cuando se complete un análisis</p>
                </div>
                <Switch
                  checked={notifications.analysisComplete}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, analysisComplete: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-white">Reportes Semanales</h4>
                  <p className="text-sm text-slate-400">Resumen semanal de actividad</p>
                </div>
                <Switch
                  checked={notifications.weeklyReports}
                  onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Preferencias Generales</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Idioma</Label>
                  <Select
                    value={preferences.language}
                    onValueChange={(value) => setPreferences({ ...preferences, language: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="es">Español</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem value="fr">Français</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-300">Zona Horaria</Label>
                  <Select
                    value={preferences.timezone}
                    onValueChange={(value) => setPreferences({ ...preferences, timezone: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Europe/Madrid">Madrid (GMT+1)</SelectItem>
                      <SelectItem value="Europe/London">Londres (GMT+0)</SelectItem>
                      <SelectItem value="America/New_York">Nueva York (GMT-5)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label className="text-slate-300">Tema</Label>
                  <Select
                    value={preferences.theme}
                    onValueChange={(value) => setPreferences({ ...preferences, theme: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="dark">Oscuro</SelectItem>
                      <SelectItem value="light">Claro</SelectItem>
                      <SelectItem value="auto">Automático</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Preferencias de Video</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Calidad de Video por Defecto</Label>
                  <Select
                    value={preferences.videoQuality}
                    onValueChange={(value) => setPreferences({ ...preferences, videoQuality: value })}
                  >
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="high">Alta (1080p)</SelectItem>
                      <SelectItem value="medium">Media (720p)</SelectItem>
                      <SelectItem value="low">Baja (480p)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-white">Auto-guardar Análisis</h4>
                    <p className="text-sm text-slate-400">Guardar automáticamente cada 30 segundos</p>
                  </div>
                  <Switch
                    checked={preferences.autoSave}
                    onCheckedChange={(checked) => setPreferences({ ...preferences, autoSave: checked })}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Cambiar Contraseña</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="text-slate-300">Contraseña Actual</Label>
                  <Input type="password" className="bg-slate-700 border-slate-600 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Nueva Contraseña</Label>
                  <Input type="password" className="bg-slate-700 border-slate-600 text-white mt-1" />
                </div>
                <div>
                  <Label className="text-slate-300">Confirmar Nueva Contraseña</Label>
                  <Input type="password" className="bg-slate-700 border-slate-600 text-white mt-1" />
                </div>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Actualizar Contraseña</Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Gestión de Datos</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Exportar Mis Datos
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-slate-600 text-slate-300 hover:text-white bg-transparent"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Importar Configuración
                </Button>
                <div className="pt-4 border-t border-slate-600">
                  <h4 className="font-medium text-red-400 mb-2">Zona de Peligro</h4>
                  <Button
                    variant="outline"
                    className="w-full border-red-600 text-red-400 hover:bg-red-600 hover:text-white bg-transparent"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Eliminar Cuenta
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
